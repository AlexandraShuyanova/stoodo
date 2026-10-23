# Stoodo API

Backend for Stoodo, a blog/posts platform. REST API on Node.js + Express with PostgreSQL (Prisma) and Cloudflare R2 for image storage.

The frontend lives in a separate repo and is included as a git submodule: [stoodo-frontend](https://github.com/AlexandraShuyanova/stoodo-frontend).

## Features

- Registration and login with JWT access tokens, passwords hashed with bcrypt
- Posts with topics, images and versioned content
- Likes and per-user post interaction history
- Image upload to Cloudflare R2
- Moderation: new posts from regular users are unpublished by default; admin posts are published immediately

## Tech stack

Node.js, TypeScript, Express 5, Prisma, PostgreSQL, JWT, bcrypt, multer, Cloudflare R2 (S3-compatible API)

## Getting started

```bash
git clone --recurse-submodules https://github.com/AlexandraShuyanova/stoodo-api-node
cd stoodo-api-node
npm install
cp .env.example .env   # fill in the values
npx prisma migrate deploy
npx prisma generate
npm run dev
```

The server starts on `http://localhost:3000`.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing tokens (use a long random string) |
| `JWT_EXPIRES_IN` | Token lifetime |
| `R2_ENDPOINT` | Cloudflare R2 endpoint |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_BUCKET_NAME` | R2 bucket name |
| `R2_PUBLIC_URL` | Public base URL for uploaded images |

## API

Base path: `/api/v1`. 🔒 = requires `Authorization: Bearer <token>`.

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in, returns access token |
| GET | `/auth/user_info` | Current user info |
| GET | `/post/posts` | List published posts |
| GET | `/post/post_by_slug/:slug` | Get a post by slug |
| GET | `/post/post_stat/:id` | Likes count for a post |
| GET | `/post/user_interaction_by_post/:id` 🔒 | Current user's interaction with a post |
| POST | `/post/create` 🔒 | Create a post |
| POST | `/post/like_post/:id` 🔒 | Like / unlike a post (`?isLiked=true`) |
| GET | `/topic/topics` | List topics |
| POST | `/image/upload` 🔒 | Upload an image (multipart, field `file`) |
