from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.core import responses
from apps.quizzes.models import Result
from apps.quizzes.views import ScoreboardMixin
from apps.users.models import User

from .serializers import UserCreateSerializer, UserSerializer


class UserCreateAPI(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # hash password
            serializer.validated_data['password'] = make_password(
                serializer.validated_data['password'],
            )
            # create an User instance
            serializer.save()
            return responses.client_success({
                "message": "Successfully created new user",
            })
        else:
            raise responses.client_error({
                "errors": serializer.errors,
            })


class UserLoginAPI(TokenObtainPairView):

    serializer_class = TokenObtainPairSerializer

    def post(self, request):
        serializer = self.serializer_class(request.user, data=request.data)

        if serializer.is_valid():
            # log the login time
            user = User.objects.get(
                email=request.data["email"],
            )
            user.last_login = timezone.now()
            user.save()

            avatar = user.avatar.url if user.avatar else ""
            data = {
                "token": serializer.validated_data,
                "user": {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                    "avatar": request.build_absolute_uri(avatar),
                }
            }
            return responses.client_success(data)
        else:
            raise responses.client_error({
                "errors": serializer.errors,
            })


class UserAPI(
    RetrieveUpdateAPIView,
    ScoreboardMixin,
):
    serializer_class = UserSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = (
        'get',
        'post',
    )

    def get_serializer_context(self):
        context = super(UserAPI, self).get_serializer_context()
        context.update({
            "scoreboard": self.filter_results(
                self.request.user.result_set.all()
            ),
        })
        return context

    def retrieve_scoreboard(self):
        """Retrieve scoreboard from Result table."""
        request = self.context.get("request")
        return self.filter_results(
            Result.objects.filter(user=request.user),
        )

    def get_object(self, pk=None):
        if pk:
            user = User.objects.filter(pk=pk).first()
        else:
            user = self.request.user
        return user

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.id
        user = self.get_object(user_id)
        data_response = {}

        if user:
            serializer = self.get_serializer(user)
            data_response["user"] = serializer.data

        return responses.client_success(data_response)

    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        user = self.get_object(user_id)
        serializer = self.get_serializer(
            user,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return responses.client_error("Invalid data.")
        serializer.save()
        return responses.client_success(data=None)
