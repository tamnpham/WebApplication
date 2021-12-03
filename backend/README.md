# API guideline

## Table of contents
- [API guideline](#api-guideline)
  - [Table of contents](#table-of-contents)
  - [Note](#note)
  - [User](#user)
  - [Question](#question)
  - [Category](#category)
  - [Blog](#blog)
  - [Quiz](#quiz)

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

/api/question/\<int:questionId\>/

**Method**: GET

**Response**:
```json
{
  "id": <int>,
  "image": <str:url>,
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
  "status": "Success",
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
    "image": (optional) <str:url>
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
  "image": <str:url>
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
  "author": {
    "first_name": <str>,
    "last_name": <str>,
    "avatar_url": <str:url>
  },
  "category": <int>,
  "image": <str:url>
}
```

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
