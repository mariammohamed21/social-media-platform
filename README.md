# Full-Stack Social Media Platform

A production-style social media web application using React, Redux Toolkit, Node.js, Express, MongoDB, JWT authentication, posts, comments, likes, profiles, messaging, notifications, search, uploads, and theme persistence.

## Project Structure

```text
social-media-platform/
  backend/       Express API, MongoDB models, controllers, routes, middleware
  frontend/      React UI, Redux store, pages, components, API services
```

## Requirements

- Node.js 18+
- MongoDB running locally, or MongoDB Atlas connection string
- npm

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set:

```env
MONGO_URI=mongodb://127.0.0.1:27017/social_media_platform
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Create uploads folder if it does not exist:

```bash
mkdir uploads
```

Run the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Optional seed data:

```bash
npm run seed
```

Seed login:

```text
fares@example.com
123456
```

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Main Terminal Commands

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Seed Database

```bash
cd backend
npm run seed
```

## API Modules

- `/api/auth` registration, login, current user
- `/api/users` profile data and profile posts
- `/api/posts` CRUD posts, likes, pagination, filtering
- `/api/comments` comments by post
- `/api/messages` conversations and messages
- `/api/notifications` notifications and unread count
- `/api/search` global search users/posts

## Notes

- Uploads are saved in `backend/uploads`.
- Images are served from `http://localhost:5000/uploads/...`.
- JWT token and theme are stored in LocalStorage.
- Messaging is API-based, not Socket.IO real-time. It simulates chat behavior through REST calls.
