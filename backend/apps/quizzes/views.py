from datetime import datetime, timedelta

from django.db.models import Q
from django.db.models.aggregates import Max
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.core import responses
from apps.questions.models import Category, Question
from apps.users.models import User

from .models import Quiz, Result
from .serializers import QuizSerializer, ResultSerializer

BASE_SCORE = 1


class QuizCreationAPI(GenericAPIView):
    """APIView for handling quiz creation."""
    queryset = None
    serializer_class = QuizSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        "post",
    )

    def get_serializer_context(self):
        context = super(QuizCreationAPI, self).get_serializer_context()
        context.update(
            {
                "request": self.request,
            }
        )
        return context

    def post(self, request, *args, **kwargs):
        """Return set of questions related to given category."""
        numberQuestions = request.data.get("numberQuestions")
        category_id = request.data.get("categoryId")
        if not numberQuestions or not category_id:
            return Response(
                data={"error": "Invalid category or number of questions."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        questions = Question.objects.filter(
            category=category_id,
        )

        quiz = Quiz(owner=request.user)
        quiz.save()

        numberQuestions = int(numberQuestions)
        questions = questions[:numberQuestions]
        for quest in questions:
            quiz.questions.add(quest)
        quiz.save()

        # Set up queryset of view class for serializer context setup
        self.queryset = questions

        data = self.get_serializer(quiz).data
        # Rename key for quiz ID
        data["quizId"] = data.pop("id")
        return responses.client_success(
            data,
        )


class QuizScoringAPI(GenericAPIView):
    """APIView for handling scoring quiz."""
    serializer_class = ResultSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        "post",
    )

    def post(self, request, *args, **kwargs):
        """Inspect user's work and return score."""
        quiz_id = request.data.get("quizId")
        answers = request.data.get("answers")
        quiz = Quiz.objects.filter(pk=quiz_id)
        if quiz_id:
            if not quiz:
                return Response(
                    data={"error": "Quiz not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            quiz = quiz.get()

        t = datetime.strptime(
            request.data.get("duration"),
            "%H:%M:%S",
        )
        duration = timedelta(
            hours=t.hour,
            minutes=t.minute,
            seconds=t.second,
        )
        result = Result(
            user=request.user,
            category=quiz.questions.first().category,      # handle later
            duration=duration,
            quiz=quiz,
            numberQuestions=quiz.numberQuestions,
        )

        score = 0
        numberCorrects = 0
        for answer in answers:
            # Need to check if exist
            question_id = answer.get("questionId")
            answer_id = answer.get("answer")

            question = Question.objects.get(pk=question_id)
            if question.trueAnswer == answer_id:
                score += BASE_SCORE      # X point / 1 correct answer
                numberCorrects += 1

        result.score = score
        result.numberCorrects = numberCorrects
        result.save()

        return responses.client_success(
            self.serializer_class(result).data,
        )


class ResultViewAPI(GenericAPIView):
    """API for viewing result."""
    queryset = Result.objects.all().order_by("-created")
    serializer_class = ResultSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        "get",
        "post",
    )

    def get(self, request, *args, **kwargs):
        return responses.client_success(
            [
                self.serializer_class(result).data
                for result in self.get_queryset()
            ],
        )

    def post(self, request, *args, **kwargs):
        """Filter results based on criteria."""
        queryset = self.get_queryset()

        # Filter by category
        category_id = request.data.get("categoryId")
        category = Category.objects.filter(pk=category_id)
        if category_id:
            if not category:
                return Response(
                    data={"error": "Category not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            category = category.get()
            queryset = self.filter_by_category(queryset, category)

        # Filter by user
        user_id = request.data.get("userId")
        user = User.objects.filter(pk=user_id)
        if user_id:
            if not user:
                return Response(
                    data={"error": "User not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            user = user.get()
            queryset = self.filter_by_user(queryset, user)

        return responses.client_success(
            [
                self.serializer_class(result).data
                for result in queryset
            ],
        )

    def filter_by_category(self, queryset, category):
        """Filter results by category."""
        queryset = queryset.filter(category=category)
        return queryset

    def filter_by_user(self, queryset, user):
        """Filter results by user."""
        return queryset.filter(user=user)


class ScoreboardMixin:
    """Scoreboard mixin"""

    def filter_results(self, queryset):
        """Filter queryset by max scores for each user and category."""
        original_queryset = queryset
        queryset = original_queryset
        # GROUP BY + MAX
        # Ref: https://git.io/JMCP4
        model_max_set = queryset.values(
            "user",
            "category",
        ).annotate(
            max_score=Max("score"),
        )

        q_statement = Q()
        for expr in model_max_set:
            q_statement |= (
                Q(user__exact=expr["user"]) &
                Q(category__exact=expr["category"]) &
                Q(score=expr["max_score"])
            )

        queryset = queryset.filter(
            q_statement,
        )

        # Ref: https://stackoverflow.com/a/41702253
        queryset = queryset.distinct(
            "user",
            "category"
        )

        queryset_ids = queryset.values("id")
        queryset = original_queryset.filter(id__in=queryset_ids)
        queryset = queryset.order_by(
            "-score",
            "duration",
        )
        return queryset


class ScoreboardViewAPI(
    ResultViewAPI,
    ScoreboardMixin,
):
    """API for viewing scoreboard."""
    queryset = Result.objects.all()

    def get_queryset(self):
        """Apply scoreboard rule to queryset."""
        queryset = super().get_queryset()
        return self.filter_results(queryset)
