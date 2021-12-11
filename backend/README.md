# API guideline

# Table of contents
- [API guideline](#api-guideline)
- [Table of contents](#table-of-contents)
- [Note](#note)
- [Pagination](#pagination)
- [Model](#model)
  - [User](#user)
  - [Admin](#admin)
  - [Question](#question)
    - [Filter](#filter)
  - [Category](#category)
    - [Filter](#filter-1)
  - [Blog](#blog)
    - [Filter](#filter-2)
  - [Quiz](#quiz)
  - [Comment](#comment)

# Note
- Except login and register, other features require JWT token to proceed.
- Only teacher can create new questions.

# Pagination
Note: This feature is disabled by purpose.
Query parameters:
- `page_size`: number of elements per page
- `page`: page number in pagination

# Model

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
      "major": <str>,
      "max_score": {
        "id": <int>,  // category ID
        "level": <int>,
        "code": <str>,
        "name": <str>,
        "score": <str>
      },
      "top_3_scores": [
        {
          "id": <int>,  // category ID
          "level": <int>,
          "code": <str>,
          "name": <str>,
          "score": <str>
        },
        ...
      ]
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
      "avatar": <str:url>
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
  "first_name": <str>,
  "last_name": <str>
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

## Admin
/api/admin/

**Method**: GET

**Response**:
```json
[
  {
    "id": <int>,
    "avatar_url": <str:url>,
    "last_login": <str>,
    "is_superuser": <bool>,
    "created": <str>,
    "modified": <str>,
    "first_name": <str>,
    "last_name": <str>,
    "is_staff": <bool>,
    "is_active": <bool>,
    "avatar": <str:url>,
    "email": <str>,
    "role": <str>,
    "phone": <str>,
    "school": <str>,
    "major": <str>,
    "groups": <list>,
    "user_permissions": <list>
  }
  ...
]
```

**Method**: POST

**Request**:
```json
{
  "userId": <str>
}
```

**Response**:
```json
{
  "status": <str>,
  "data": null,
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
    "image_url": <str:url>,
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
  "title": (optional) <str>,
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
  "image_url": <str:url>,
  "category": <int>
},
```

**Expected status**: 201 Created

<hr>

/api/question/\<int:questionId\>/

**Method**: GET

**Response**:
```json
{
  "id": <int>,
  "image": <str:url>,
  "image_url": <str:url>,
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
  "category": <int>
}
```

**Method**: DELETE

**Expected status**: 204 No content

<hr>

/api/question/filter/

**Method**: POST

**Request**:
```json
{
  "categoryId": <int>
}
```

**Response**:
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
      "trueAnswer": <int>,
      "image": <str:url>,
      "image_url": <str:url>,
      "category": <int>
    },
    ...
  ]
}
```

<hr>

/api/question/update/

**Method**: POST

**Request**:
```json
{
  "id": <int>,
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
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": null
}
```

### Filter
Query parameter:
- `content`: get question by given content keywords
- `code`: get question by given code keywords

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

**Method**: POST

**Request**:
```json
{
  "name": <str>,
  "level": (optional) <int>,
  "code": (optional) <str>
}
```

**Response**:
```json
{
  "id": <int>,
  "name": <str>,
  "level": (optional) <int>,
  "code": (optional) <str>
}
```

<hr>

/api/category/\<int:category_id\>/

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

**Method**: DELETE

**Expected status**: 204 No content

<hr>

/api/category/update/

**Method**: POST

**Request**:
```json
{
  "id": <int>,
  "name": <str>,
  "code": (optional) <str>,
  "level": (optional) <int>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": null
}
```

### Filter
Query parameter:
- `name`: get question by given name keywords
- `code`: get question by given code keywords

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
    "image": (optional) <str:url>,
    "image_url": (optional) <str:url>
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
    "category": (optional) <int>,
    "image": (optional) <file>
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
  "image": <str:url>,
  "image_url": <str:url>
}
```
**Expected status**: 201 Created

<hr>

/api/blog/\<int:blog_id\>/

**Method**: GET

**Response**
```json
{
  "id": <int>,
  "created": <str:timestamp>,
  "modified": <str:timestamp>,
  "title": <str>,
  "content": <str>,
  "author": {
    "first_name": <str>,
    "last_name": <str>,
    "avatar_url": <str:url>
  },
  "category": <int>,
  "image": <str:url>,
  "image_url": <str:url>
}
```

**Method**: DELETE

**Status code**: 204 No content

<hr>

/api/blog/update/

**Method**: POST

**Request**: All fields are optional
```json
{
  "id": <int>,
  "title": <str>,
  "content": <str>,
  "category": <int>,
  "image": <file>
}
```

**Response**
```json
{
  "status": <str:status_message>,
  "data": null
}
```

### Filter
Query parameter:
- `title`: get question by given title keywords
- `content`: get question by given content keywords

## Quiz

/api/quiz/create/

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
  "data": {
    "quizId": <int>,
    "owner": <int>,
    "numberQuestions": <int>,
    "questions": [
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
        "image_url": <str:url>,
        "category": <int>
      },
      ...
    ]
  }
}
```

<hr>

/api/quiz/score/

**Method**: POST

**Request**:
```json
{
  "quizId": <int>,
  "duration": <str>,     // format: "hour:minute:second", e.g., "00:30:04"
  "answers": [
    {
        "questionId": <int>,
        "answer": <int>     // 0->A, 1->B, 2->C, 3->D
    },
    ...
  ]
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": {
    "id": <int>,    // result's id
    "duration": <str>,
    "score": <str>,
    "numberCorrects": <int>,
    "numberQuestions": <int>,
    "user": {
      "id": <int>,  // user's id
      "first_name": <str>,
      "last_name": <str>
    },
    "category": (optional) <int>    // category relevant to the result
  }
}
```

<hr>

/api/quiz/result/

**Method**: GET

**Response**:
```json
{
  "status": <str:status_message>,
  "data": [
    {
      "id": <int>,    // result's id
      "duration": <str>,
      "score": <str>,
      "numberCorrects": <int>,
      "numberQuestions": <int>,
      "user": {
        "id": <int>,  // user's id
        "first_name": <str>,
        "last_name": <str>
      },
      "category": (optional) <int>,  // category's id
      "quiz": <int>   // quiz's id
    },
    ...
  ]
}
```

**Method**: POST

**Request**:
```json
{
  "categoryId": (optional) <int>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": [
    {
      "id": <int>,    // result's id
      "duration": <str>,
      "score": <str>,
      "numberCorrects": <int>,
      "numberQuestions": <int>,
      "user": {
        "id": <int>,  // user's id
        "first_name": <str>,
        "last_name": <str>
      },
      "category": (optional) <int>,  // category's id
      "quiz": <int>   // quiz's id
    },
    ...
  ]
}
```

<hr>

/api/quiz/scoreboard/

**Method**: GET

**Response**:
```json
{
  "status": <str:status_message>,
  "data": [
    {
      "id": <int>,    // result's id
      "duration": <str>,
      "score": <str>,
      "numberCorrects": <int>,
      "numberQuestions": <int>,
      "user": {
        "id": <int>,  // user's id
        "first_name": <str>,
        "last_name": <str>
      },
      "category": (optional) <int>,  // category's id
      "quiz": <int>   // quiz's id
    },
    ...
  ]
}
```

**Method**: POST

**Request**:
```json
{
    "categoryId": (optional) <int>,
    "userId": (optional) <int>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": [
    {
      "id": <int>,    // result's id
      "duration": <str>,
      "score": <str>,
      "numberCorrects": <int>,
      "numberQuestions": <int>,
      "user": {
        "id": <int>,  // user's id
        "first_name": <str>,
        "last_name": <str>
      },
      "category": (optional) <int>,  // category's id
      "quiz": <int>   // quiz's id
    },
    ...
  ]
}
```

## Comment

/api/comment/

**Method**: GET

**Response**:
```json
[
  {
    "id": <int>,
    "user": {
      "first_name": <str>,
      "last_name": <str>,
      "avatar_url": <str>
    },
    "created": <str>,
    "modified": <str>,
    "content": <str>,
    "blog": <int> // blog's id
  },
  ...
]
```

**Expected status**: 200 OK

**Method**: POST

**Request**:
```json
{
  "blog": <int>, // blog's id
  "content": <str>
}
```

**Response**:
```json
{
  "id": <int>,
  "user": {
    "first_name": <str>,
    "last_name": <str>,
    "avatar_url": <str>
  },
  "created": <str>,
  "modified": <str>,
  "content": <str>,
  "blog": <int> // blog's id
}
```

<hr>

/api/comment/\<int:comment_id\>/

**Method**: GET

**Response**:
```json
{
  "id": <int>,
  "user": {
    "first_name": <str>,
    "last_name": <str>,
    "avatar_url": <str>
  },
  "created": <str>,
  "modified": <str>,
  "content": <str>,
  "blog": <int> // blog's id
}
```

**Expected status**: 200 OK

**Method**: DELETE

**Expected status**: 204 No content

<hr>

/api/comment/update/

**Method**: POST

**Request**:
```json
{
  "blog": <int>,  // blog's id
  "content": <str>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": null
}
```
