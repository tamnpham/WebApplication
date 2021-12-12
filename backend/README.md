# API guideline

# Table of contents
- [API guideline](#api-guideline)
- [Table of contents](#table-of-contents)
- [Note](#note)
- [Pagination](#pagination)
- [Model](#model)
  - [User](#user)
    - [Profile](#profile)
      - [Get user profile](#get-user-profile)
      - [Update profile](#update-profile)
    - [Login](#login)
    - [Register](#register)
  - [Admin](#admin)
    - [List of users](#list-of-users)
    - [Promote a student role to teacher role](#promote-a-student-role-to-teacher-role)
  - [Question](#question)
    - [List of questions](#list-of-questions)
    - [Create a new question](#create-a-new-question)
    - [Get question by ID](#get-question-by-id)
    - [Delete question by ID](#delete-question-by-id)
    - [Get question by Category ID](#get-question-by-category-id)
    - [Update question](#update-question)
    - [Filter](#filter)
  - [Category](#category)
    - [List of categories](#list-of-categories)
    - [Create a new category](#create-a-new-category)
    - [Get category by ID](#get-category-by-id)
    - [Delete category by ID](#delete-category-by-id)
    - [Update category](#update-category)
    - [Filter](#filter-1)
  - [Blog](#blog)
    - [List of blogs](#list-of-blogs)
    - [Create new blog](#create-new-blog)
    - [Get blog by ID](#get-blog-by-id)
    - [Delete blog by ID](#delete-blog-by-id)
    - [Update blog](#update-blog)
    - [Filter](#filter-2)
  - [Quiz](#quiz)
    - [Create a quiz](#create-a-quiz)
    - [Scoring](#scoring)
    - [List of results](#list-of-results)
    - [Filter by category](#filter-by-category)
    - [Scoreboard](#scoreboard)
      - [Get scoreboard](#get-scoreboard)
      - [Filter scoreboard by category or user](#filter-scoreboard-by-category-or-user)
  - [Comment](#comment)
    - [List of comments](#list-of-comments)
    - [Create a new comment](#create-a-new-comment)
    - [Get comment by ID](#get-comment-by-id)
    - [Delete comment by ID](#delete-comment-by-id)
    - [Update comment](#update-comment)
  - [Badge](#badge)
    - [List of badges](#list-of-badges)
    - [Create a new badges](#create-a-new-badges)
    - [Get badge by ID](#get-badge-by-id)
    - [Delete badge by ID](#delete-badge-by-id)
    - [Update badge](#update-badge)

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

### Profile

#### Get user profile
/api/user/profile/

**Method**: GET

**Permission**: User

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
      "badges": [
        {
          "id": <int>,
          "image_url": <str:url>,
          "title": <str>,
          "image": <str:url>,
          "required_points": <float>,   // str
          "required_exams": <int>
        },
        ...
      ]
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

#### Update profile

/api/user/profile/

**Method**: POST

**Permission**: User

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

### Login

/api/user/login/

**Method**: POST

**Permission**: Any

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

### Register

/api/user/create/

**Method**: POST

**Permission**: Any

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

### List of users
/api/admin/

**Method**: GET

**Permission**: Admin

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

### Promote a student role to teacher role

/api/admin/

**Method**: POST

**Permission**: Admin

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

### List of questions
/api/question/

**Method**: GET

**Permission**: Admin, Teacher, User

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

### Create a new question
/api/question/

**Method**: POST

**Permission**: Admin, Teacher

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
}
```

**Expected status**: 201 Created

### Get question by ID
/api/question/\<int:questionId\>/

**Method**: GET

**Permission**: Admin, Teacher, User

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

### Delete question by ID
/api/question/\<int:questionId\>/

**Method**: DELETE

**Permission**: Admin, Teacher

**Expected status**: 204 No content

### Get question by Category ID

/api/question/filter/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### Update question
/api/question/update/

**Method**: POST

**Permission**: Admin, Teacher

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

### List of categories
/api/category/

**Method**: GET

**Permission**: Admin, Teacher, User

**Response**:
```json
[
  {
    "id": <int>,
    "numberQuestions": <int>,
    "name": <str>,
    "level": <int>,
    "code": <str>
  },
  ...
]
```

**Expected status**: 200 OK

### Create a new category
/api/category/

**Method**: POST

**Permission**: Admin, Teacher 

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
  "numberQuestions": <int>,
  "name": <str>,
  "level": <int>,
  "code": <str>
}
```

### Get category by ID

/api/category/\<int:category_id\>/

**Method**: GET

**Permission**: Admin, Teacher, User

**Response**:
```json
{
  "id": <int>,
  "numberQuestions": <int>,
  "name": <str>,
  "level": <int>,
  "code": <str>
}
```

**Expected status**: 200 OK

### Delete category by ID

/api/category/\<int:category_id\>/

**Method**: DELETE

**Permission**: Admin, Teacher

**Expected status**: 204 No content

### Update category
/api/category/update/

**Method**: POST

**Permission**: Admin, Teacher

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

### List of blogs
/api/blog/

**Method**: GET

**Permission**: Admin, Teacher, User

**Response**
```json
[
  {
    "id": <int>,
    "created": <str:timestamp>,
    "modified": <str:timestamp>,
    "title": <str>,
    "content": <str>,
    "author": {
      "first_name": <str>,
      "last_name": <str>,
      "avatar_url": <str:url>,
      "avatar": <str:url>
    },
    "category": <int>,
    "image": (optional) <str:url>,
    "image_url": (optional) <str:url>,
    "comments": [
      {
        "id": <int>,
        "user": {
          "first_name": <str>,
          "last_name": <str>,
          "avatar_url": <str:url>,
          "avatar": <str:url>
        },
        "created": <str>,
        "modified": <str>,
        "content": <str>,
        "blog": <int>   // blog's id
      },
      ...
    ]
  },
  ...
]
```

### Create new blog
/api/blog/

**Method**: POST

**Permission**: Admin, Teacher

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
  "author": {
    "first_name": <str>,
    "last_name": <str>,
    "avatar_url": <str:url>,
    "avatar": <str:url>
  },
  "category": <int>,
  "image": (optional) <str:url>,
  "image_url": (optional) <str:url>,
  "comments": []
}
```
**Expected status**: 201 Created

### Get blog by ID
/api/blog/\<int:blog_id\>/

**Method**: GET

**Permission**: Admin, Teacher, User

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
    "avatar_url": <str:url>,
    "avatar": <str:url>
  },
  "category": <int>,
  "image": (optional) <str:url>,
  "image_url": (optional) <str:url>,
  "comments": [
    {
      "id": <int>,
      "user": {
        "first_name": <str>,
        "last_name": <str>,
        "avatar_url": <str:url>,
        "avatar": <str:url>
      },
      "created": <str>,
      "modified": <str>,
      "content": <str>,
      "blog": <int>   // blog's id
    },
    ...
  ]
}
```

### Delete blog by ID
/api/blog/\<int:blog_id\>/

**Method**: DELETE

**Permission**: Admin, Teacher

**Status code**: 204 No content

### Update blog

/api/blog/update/

**Method**: POST

**Permission**: Admin, Teacher

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

### Create a quiz
/api/quiz/create/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### Scoring
/api/quiz/score/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### List of results
/api/quiz/result/

**Method**: GET

**Permission**: Admin, Teacher, User

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

### Filter by category
/api/quiz/result/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### Scoreboard

#### Get scoreboard
/api/quiz/scoreboard/

**Method**: GET

**Permission**: Admin, Teacher, User

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
#### Filter scoreboard by category or user
/api/quiz/scoreboard/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### List of comments
/api/comment/

**Method**: GET

**Permission**: Admin, Teacher, User

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

### Create a new comment
/api/comment/

**Method**: POST

**Permission**: Admin, Teacher, User

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

### Get comment by ID
/api/comment/\<int:comment_id\>/

**Method**: GET

**Permission**: Admin, Teacher, User

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

### Delete comment by ID
/api/comment/\<int:comment_id\>/

**Method**: DELETE

**Permission**: Admin, User

**Expected status**: 204 No content

### Update comment
/api/comment/update/

**Method**: POST

**Permission**: Admin, User

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

## Badge

### List of badges
/api/badge/

**Method**: GET

**Permission**: Admin, Teacher, User

**Response**:
```json
[
  {
    "id": <int>,
    "image_url": <str:url>,
    "title": <str>,
    "image": <str:url>,
    "required_points": <float>,   // str
    "required_exams": <int>
  },
  ...
]
```

**Expected status**: 200 OK

### Create a new badges
/api/badge/

**Method**: POST

**Permission**: Admin, Teacher

**Request**:
```json
{
  "title": <str>,
  "required_points": <float>,
  "required_exams": <int>,
  "image": (optional) <file>
}
```

**Response**:
```json
{
  "id": <int>,
  "image_url": <str:url>,
  "title": <str>,
  "image": <str:url>,
  "required_points": <float>, // str
  "required_exams": <int>
}
```

### Get badge by ID
/api/badge/\<int:badge_id\>/

**Method**: GET

**Permission**: Admin, Teacher, User

**Response**:
```json
{
  "id": <int>,
  "image_url": <str:url>,
  "title": <str>,
  "image": <str:url>,
  "required_points": <float>,   // str
  "required_exams": <int>
}
```

**Expected status**: 200 OK

### Delete badge by ID
/api/badge/\<int:badge_id\>/

**Method**: DELETE

**Permission**: Admin, Teacher

**Expected status**: 204 No content

### Update badge

/api/badge/update/

**Method**: POST

**Permission**: Admin, Teacher

**Request**:
```json
{
  "id": <int>,
  "title": <str>,
  "image": <file>,
  "required_points": <float>,
  "required_exams": <int>
}
```

**Response**:
```json
{
  "status": <str:status_message>,
  "data": null
}
```
