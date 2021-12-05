"""
Dataset format:
- Question:
    {
        "category_name": <str>,      
        "category code": <str>,     // create new category if not exist
        "content": <str>,
        "answers": [
            <str>,
            <str>,
            <str>,
            <str>
        ],
        "trueAnswer": <int>,
        "image": (optional) <path>,
        "code": (optional) <str>
    }
"""

import json
import os

import requests
from django.core.files.images import ImageFile
from rest_framework import status

from apps.questions.models import Category, Question

DOMAIN_NAME = "http://localhost:8080"


def import_via_model():
    dataset_path = os.path.join(
        os.getcwd(),
        "dataset",
    )
    list_exam_dirs = [
        filename
        for filename in os.listdir(dataset_path)
        if os.path.isdir(
            os.path.join(
                dataset_path,
                filename,
            )
        )
    ]
    for dirname in list_exam_dirs:
        json_path = os.path.join(dataset_path, dirname, "data.json")
        with open(json_path, encoding="utf-8") as f:
            data = json.load(f)
            questions = data["data"]["questions"]
            for entry in questions:
                category = Category.objects.filter(
                    code=entry.get("category_code"),
                )
                if not category:
                    category = Category(
                        name=entry.get("category_name"),
                        code=entry.get("category_code"),
                    )
                    category.save()
                else:
                    category = category.get()

                image = None
                if entry.get("image"):
                    image_path = os.path.join(
                        dataset_path,
                        dirname,
                        entry.get("image"),
                    )
                    image = ImageFile(open(image_path))

                new_question = Question(
                    category=category,
                    code=entry.get("code"),
                    content=entry.get("content"),
                    answers=entry.get("answers"),
                    trueAnswer=entry.get("trueAnswer"),
                    image=image,
                )
                new_question.save()


def api_send(url, headers, data, expected_status):
    response = requests.post(
        url,
        headers=headers,
        data=data,
    )
    import ipdb; ipdb.set_trace()
    assert response.status_code == expected_status
    return response


def import_via_api():
    dataset_path = os.path.join(
        os.getcwd(),
        "dataset",
    )
    list_exam_dirs = [
        filename
        for filename in os.listdir(dataset_path)
        if os.path.isdir(
            os.path.join(
                dataset_path,
                filename,
            )
        )
    ]
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwNDkwMjg1LCJpYXQiOjE2Mzc4OTgyODUsImp0aSI6IjkwN2FjOTVkNDkzOTRjODRhYTEzZTkwOWZkYjM3NDFhIiwidXNlcl9pZCI6MX0.0s_zBI0mylaypCvgPNxUtm7KagIn6URViH5gR8F3JOo"
    headers = {
        "Authorization": "Bearer {}".format(token),
        "User-Agent": "Mozilla/5.0",
    }
    for dirname in list_exam_dirs:
        json_path = os.path.join(dataset_path, dirname, "data.json")
        with open(json_path, encoding="utf-8") as f:
            data = json.load(f)
            questions = data["data"]["questions"]
            for entry in questions:
                category = Category.objects.filter(
                    code=entry.get("category_code"),
                )
                if not category:
                    url = DOMAIN_NAME + "/api/category/"
                    data = {
                        "name": entry.get("category_name"),
                        "code": entry.get("category_code"),
                    }
                    response = api_send(
                        url=url,
                        headers=headers,
                        data=data,
                        expected_status=status.HTTP_201_CREATED,
                    )
                else:
                    category = category.get()

                url = DOMAIN_NAME + "/api/question/"
                data = {
                    "category": category.id,
                    "code": entry.get("code"),
                    "content": entry.get("content"),
                    "answers": entry.get("answers"),
                    "trueAnswer": entry.get("trueAnswer"),
                }
                if entry.get("image"):
                    image_path = os.path.join(
                        dataset_path,
                        dirname,
                        entry.get("image"),
                    )
                    with open(image_path, "rb") as fs:
                        data["image"] = fs
                        response = api_send(
                            url=url,
                            headers=headers,
                            data=data,
                            expected_status=status.HTTP_201_CREATED,
                        )
                else:
                    response = api_send(
                        url=url,
                        headers=headers,
                        data=data,
                        expected_status=status.HTTP_201_CREATED,
                    )


if __name__ == "__main__":
    import_via_api()
