# Second Brain

Second Brain is a full-stack personal knowledge base for capturing ideas, saving links and media, and sharing a curated public view with one link.

## What It Does

- Create an account and sign in with JWT-based authentication.
- Save content items with a title, link, and type.
- Organize saved content in a protected dashboard.
- Filter items by content type.
- Preview supported content types directly in the dashboard.
- Generate a shareable public brain link for others to view.
- Copy item links and share links to the clipboard.
- Switch between light and dark themes in the dashboard.

## Tech Stack

### Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- react-hot-toast

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens
- bcrypt
- Zod
- CORS

## Project Structure

```text
backend/           Express + TypeScript API
frontend/          React + Vite client
embedding_service/ Placeholder service folder
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB connection string

## Environment Variables

### Backend

Create a `.env` file inside `backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECREAT=your_jwt_secret
PORT=3000
```

Note: the backend currently reads `JWT_SECREAT` with that exact spelling.

### Frontend

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

The checked-in frontend `.env` points to the deployed backend, so update it locally if you are running the API on your machine.

## Running Locally

### 1. Start the backend

```bash
cd backend
npm install
npm run build
npm run start
```

If you prefer the scripted workflow in this repo, `npm run dev` builds first and then starts the compiled server.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available in the Vite dev server output, usually at `http://localhost:5173`.

## How It Works

1. Sign up with a name, username, and password.
2. Sign in to receive a JWT token.
3. Use the dashboard to add content items with a title, URL, and type.
4. Filter your saved content by type.
5. Share your brain with a generated public link.
6. Open the shared view to browse the published content without signing in.

## Supported Content Types

- Image
- Video
- Article
- Audio

## API Overview

### Auth

- `POST /api/v1/user/signup`
- `POST /api/v1/user/signin`
- `GET /api/v1/user/me`

### Content

- `POST /api/v1/content`
- `GET /api/v1/content`
- `DELETE /api/v1/content`

### Sharing

- `POST /api/v1/brain/share`
- `GET /api/v1/brain/:shareLink`

Most protected routes expect the JWT token in the `Authorization` header.

## Deployment Notes

- The backend includes a Vercel configuration that routes requests to `backend/src/index.ts`.
- The frontend includes a Vercel rewrite so client-side routes keep working on refresh.

## Future Ideas

- Add richer content notes and tagging.
- Add delete and edit actions in the dashboard UI.
- Expand search and sorting.
- Wire up the placeholder embedding service if semantic search is added later.

## License

This project is currently marked as ISC in the package metadata.
