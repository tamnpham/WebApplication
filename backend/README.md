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
- Only teacher can create new questions.

## User
/api/user/profile/

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
        "school": <str>,
        "major": <str>
    }
  }
}
```

**Method**: POST

**Request**: All field are *optional*
```json
{
    "first_name": <str>,
    "last_name": <str>,
    "phone": <str>,
    "avatar": <file>,   // using file upload
    "school": <str>,
    "major": <str>
}
```

**Response**:
```json
{
    "status": <str:status_message>,
    "data": null
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
        "token": {
            "refresh": <str>,
            "access": <str>
        },
        "user": {
            "first_name": <str>,
            "last_name": <str>,
            "role": <str>,
            "avatar": <str:url_path>
        }
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
        "trueAnswer": <int>,
        "image": <str:url>,
        "category": <int>
    },
    ...
]
```

**Method**: POST

**Request**:
```json
{
    "category": <int>,
    "title": <str>,
    "content": <str>,
    "answers": [
        <str>,
        <str>,
        <str>,
        <str>
    ],
    "trueAnswer": <int>,
    "image": (optional) <file>,
    "code": (optional) <str>
}
```

**Response**:
```json
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
    "true": <int>,
    "image": <str:url>,
    "category": <int>
},
```

**Expected status**: 201 Created

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

<hr>

/api/blog/\<int:blog_id\>/update/

**Method**: POST

**Request**:
```json
{
    "title": <str>,
    "content": <str>,
    "category": (optional) <int>
}
```

**Response**
```json
{
    "status": <str:status_message>,
    "data": null
}
```


