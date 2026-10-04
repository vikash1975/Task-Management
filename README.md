# Task Management API

This is a backend API for managing tasks.  
Users can register, login and manage their own tasks after authentication.

## Tech Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Postman

## Features

- User registration
- User login
- JWT authentication
- Get user profile
- Create task
- Get all tasks
- Get task by ID
- Update task
- Delete task
- Search tasks
- Filter tasks by status and priority
- Pagination

## Setup

First install the project dependencies:

```bash
npm install
```

Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the server:

```bash
npm run dev
```

The server will start on:
http://localhost:5000


## API Routes

### Auth

**Register**
```text
POST /api/auth/register
```

**Login**
POST /api/auth/login

**Profile**
GET /api/auth/profile


Profile requires a valid JWT token.

### Tasks

**Create Task**
```text
POST /api/tasks
```

**Get Tasks**
```text
GET /api/tasks
```

**Get Task**

GET /api/tasks/:id


**Update Task**
PUT /api/tasks/:id


**Delete Task**
DELETE /api/tasks/:id

## Task Details

A task contains:

- title
- description
- status
- priority
- dueDate

Status can be:

```text
Pending
In Progress
Completed
```

Priority can be:

```text
Low
Medium
High
```

## Search and Filter

Tasks can be searched using the `search` query parameter.

Example:

```text
GET /api/tasks?search=assignment
```

Tasks can also be filtered:

```text
GET /api/tasks?status=Completed
```

```text
GET /api/tasks?priority=High
```

Pagination is also supported:

```text
GET /api/tasks?page=1&limit=10
```

## Authentication

For protected APIs, send the token in the request header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Postman

The Postman collection is included with the project for testing the APIs.

## Note

The `.env` file contains private configuration values and should not be uploaded to GitHub.