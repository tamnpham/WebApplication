from datetime import datetime, timedelta

from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.questions.models import Question

from .models import Quiz, Result
from .serializers import QuizSerializer, ResultSerializer


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

        return responses.client_success(
            self.serializer_class(quiz).data,
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
        duration = timedelta(hours=t.hour, minutes=t.minute, seconds=t.second)
        result = Result(
            user=request.user,
            category=None,      # handle later
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
                score += 1      # X point / 1 correct answer
                n_corrects += 1

        result.score = score
        result.n_corrects = n_corrects
        result.save()

        return responses.client_success(
            self.serializer_class(result).data,
        )


class ResultViewAPI(GenericAPIView):
    """ViewSet for viewing result."""
    serializer_class = ResultSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        "get",
    )

    def get(self, request, *args, **kwargs):
        """Get results related to current user."""
        user = request.user
        results = Result.objects.filter(user=user)

        return responses.client_success(
            [
                self.serializer_class(result).data
                for result in results
            ],
        )
