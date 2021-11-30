from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.core import responses
from apps.users.models import User

from .serializers import UserCreateSerializer, UserSerializer


class UserCreateAPI(CreateAPIView):
    serializer_class = UserCreateSerializer

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
                    "avatar": avatar,
                }
            }
            return responses.client_success(data)
        else:
            raise responses.client_error({
                "errors": serializer.errors,
            })


class UserAPI(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (
        IsAuthenticated,
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
            data_response["user"] = self.get_serializer(user).data

        return responses.client_success(data_response)

    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        user = self.get_object(user_id)
        fields = (
            "first_name",
            "last_name",
            "phone",
            "avatar",
            "school",
            "major",
        )
        for field in fields:
            value = request.data.get(field)
            if value:
                setattr(user, field, value)

        user.save()
        return responses.client_success(data=None)
