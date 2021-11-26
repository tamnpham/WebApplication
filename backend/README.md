# API guideline

## Table of contents
- [API guideline](#api-guideline)
  - [Table of contents](#table-of-contents)
  - [Note](#note)
  - [User](#user)
  - [Question](#question)
  - [Category](#category)
  - [Blog](#blog)

## Note
- Except login and register, other features require JWT token to proceed.

## User
/api/user/\<int:user_id\>/get

**Method**: GET

**Response**:
```json
{
  "status": <str:status_message>,
  "data": {
    "user": {
      "id": <int>,
      "first_name": <str>,
      "last_name": <str>,
      "phone": <str>,
      "email": <str>,
      "role": <str>,
    }
  }
}
```

<hr>

/api/user/login/

**Method**: POST

**Request**:
```json
{
    "email": <str>,
    "password": <str>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": {
    "refresh": <str>,
    "access": <str>
  }
}
```

<hr>

/api/user/create/

**Method**: POST

**Request**:
```json
{
    "email": <str>,
    "password": <str>,
    "role": (optional) <str>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": {
    "message": <str>
  }
}
```

## Question
/api/question/

**Method**: GET

**Response**:
```json
[
    {
        "id": <int>,
        "created": <str:timestamp>,
        "modified": <str:timestamp>,
        "code": <str>,
        "title": <str>,
        "content": <str>,
        "answers": [
            <str>,
            <str>,
            <str>,
            <str>
        ],
        "image": <str:url>,
        "category": <int>
    },
    ...
]
```

<hr>

/api/question/quiz/

**Method**: POST

**Request**:
```json
{
    "categoryId": <int>,
    "numberQuestions": <int>
}
```

**Response**
```json
{
    "status": <str:status_message>,
    "data": [
        {
            "id": <int>,
            "created": <str:timestamp>,
            "modified": <str:timestamp>,
            "code": <str>,
            "title": <str>,
            "content": <str>,
            "answers": [
                <str>,
                <str>,
                <str>,
                <str>
            ],
            "image": <str:url>,
            "category": <int>
        }
    ]
}
```

## Category

/api/category/

**Method**: GET

**Response**:
```json
[
  {
    "id": <int>,
    "created": <str>,
    "modified": <str>,
    "name": <str>,
    "level": <int>,
    "code": <str>
  },
  ...
]
```

**Expected status**: 200 OK

<hr>

/api/category/\<int:category_id\>

**Method**: GET

**Response**:
```json
{
    "id": <int>,
    "created": <str>,
    "modified": <str>,
    "name": <str>,
    "level": <int>,
    "code": <str>
    }
```

**Expected status**: 200 OK

## Blog

/api/blog/

**Method**: GET

**Response**
```json
[
  {
    "id": <int>,
    "created": <str:timestamp>,
    "modified": <str:timestamp>,
    "title": <str>,
    "content": <str>,
    "author": <int>,
    "category": <int>,
  },
  ...
]
```

**Method**: POST

**Request**:
```json
{
    "title": <str>,
    "content": <str>,
    "author": <int>,
    "category": (optional) <int>
}
```

**Response**:
```json
{
    "id": <int>,
    "created": <str:timestamp>,
    "modified": <str:timestamp>,
    "title": <str>,
    "content": <str>,
    "author": <int>,
    "category": <int>,
}
```
**Expected status**: 201 Created

<hr>

/api/blog/\<int:blog_id\>

**Method**: GET

**Response**
```json
{
    "id": <int>,
    "created": <str:timestamp>,
    "modified": <str:timestamp>,
    "title": <str>,
    "content": <str>,
    "author": <int>,
    "category": <int>,
}
```



