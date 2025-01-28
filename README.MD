# Fini

Fini is a web app for managing tasks effortlessly. Users can create an account, log in securely, and manage their tasks with ease. The app lets users create, organise, and prioritise tasks, set deadlines, and track progress — all through a clean, intuitive interface.

## Demo

[Live Demo](https://fini-demo.pages.dev/)

Disclaimer: This demo does not use authentication. It also makes use of local storage instead of an external Postgres database.

## Getting Started

If you want to run this app locally, follow these instructions:

To run the development server:

```bash
cd frontend

# then

npm install

# then

npm run dev

# finally, in a new terminal window repeat the same steps for the backend
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

```bash
# frontend .env.local file:

VITE_BASE_URL="http://localhost:5003"

# backend .env.local file:

PORT=5003

DATABASE_URL="YOUR POSTGRES CONNECTION STRING GOES HERE"

JWT_SECRET_KEY="YOUR SECRET KEY GOES HERE"
```
