from datetime import datetime, timedelta

from django.db.models import Q
from django.db.models.aggregates import Max
from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.core.paginations import StandardPagination
from apps.core.permissions import IsAdminOrTeacher
from apps.core.views import CustomMixin
from apps.questions.models import Category, Question
from apps.quizzes.models.badge import Badge

from .models import Quiz, Result
from .serializers import BadgeSerializer, QuizSerializer, ResultSerializer

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

        # Check if the user met requirements to receive new achievement
        user = request.user
        badges = user.check_and_add_badges()

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
    # pagination_class = StandardPagination

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
        # Pagination
        # Ref:https://stackoverflow.com/a/45670649
        # queryset = super().get_queryset().filter(user=self.request.user)
        # page = self.paginate_queryset(queryset)
        # return page

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Pagination
        # Ref:https://stackoverflow.com/a/45670649
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.serializer_class(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        return responses.client_success(
            [
                self.serializer_class(result).data
                for result in queryset
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

        # Pagination
        # Ref:https://stackoverflow.com/a/45670649
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.serializer_class(page, many=True)
        #     return self.get_paginated_response(serializer.data)
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
    pagination_class = StandardPagination

    def get_queryset(self):
        """Apply scoreboard rule to queryset."""
        queryset = self.queryset
        return self.filter_results(queryset)


class BadgeViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
    GenericViewSet,
):
    """ViewSet for viewing Badge."""
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes_map = {
        "default": (IsAuthenticated,),
        "create": (IsAuthenticated, IsAdminOrTeacher,),
        "destroy": (IsAuthenticated, IsAdminOrTeacher,),
        "post_update": (IsAuthenticated, IsAdminOrTeacher,),
    }
    model = Badge
