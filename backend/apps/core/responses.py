from django.http import JsonResponse
from rest_framework.exceptions import APIException
from rest_framework import status


def client_success(data):
    return JsonResponse(
        status=status.HTTP_200_OK,
        data={
            "status": "Success",
            "data": data
        }
    )


def client_error(errors):
    return APIException(
        code=status.HTTP_400_BAD_REQUEST,
        detail={
            "status": "Error",
            "data": errors
        }
    )


def server_error(errors):
    return APIException(
        code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail={
            "status": "Error",
            "data": "Internal Server Errors"
        }
    )


NOT_FOUND = client_error({
    "errors": "Not Found"
})

PERMISSION_DENIED = client_error({
    "errors": "Permission Denied"
})

BAD_REQUEST = client_error({
    "errors": "Bad Request"
})