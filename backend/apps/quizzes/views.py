from datetime import datetime, timedelta

from django.db.models import Q
from django.db.models.aggregates import Max
from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.questions.models import Category, Question
from apps.users.models import User

from .models import Quiz, Result
from .serializers import QuizSerializer, ResultSerializer

BASE_SCORE = 1


class QuizCreationAPI(GenericAPIView):
    """APIView for handling quiz creation."""
    serializer_class = QuizSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        "post",
    )

    def post(self, request, *args, **kwargs):
        """Return set of questions related to given category."""
        n_questions = request.data.get("numberQuestions")
        category_id = request.data.get("categoryId")
        if not n_questions or not category_id:
            return Response(
                data={"error": "Invalid category or number of questions."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # order_by("?") randomize queryset
        # https://stackoverflow.com/a/47618345
        questions = Question.objects.filter(
            category=category_id,
        ).order_by("?")
        n_questions = int(n_questions)

        quiz = Quiz(owner=request.user)
        quiz.save()
        questions = questions[:n_questions]
        for quest in questions:
            quiz.questions.add(quest)
        quiz.save()

        data = self.serializer_class(quiz).data
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

        n_questions = quiz.questions.count()
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
            n_questions=quiz.n_questions,
        )

        score = 0
        n_corrects = 0
        for answer in answers:
            # Need to check if exist
            question_id = answer.get("questionId")
            answer_id = answer.get("answer")

            question = Question.objects.get(pk=question_id)
            if question.trueAnswer == answer_id:
                score += BASE_SCORE      # X point / 1 correct answer
                n_corrects += 1

        result.score = score
        result.n_corrects = n_corrects
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
        queryset = queryset.filter(
            Q(
                category=category,
            ) |
            Q(
                quiz__questions__category=category,
            )
        ).distinct("id")
        return queryset

    def filter_by_user(self, queryset, user):
        """Filter results by user."""
        return queryset.filter(user=user)


class ScoreboardViewAPI(ResultViewAPI):
    """API for viewing scoreboard."""
    queryset = Result.objects.all()

    def get_queryset(self):
        """Filter queryset by max scores for each user and category."""
        queryset = super().get_queryset()
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
        ).order_by(
            "-score",
            "duration",
        )
        return queryset
