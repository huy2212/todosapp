# Todos App

A simple RESTful API for managing todo tasks, built with Node.js, Express, and MongoDB. The project is containerized using Docker for easy deployment and development.

## Features
- Create and retrieve todo tasks
- RESTful API endpoints
- MongoDB for persistent storage
- Docker and Docker Compose support
- CORS enabled for cross-origin requests

## Prerequisites
NodeJs, Docker, MongoDB

## Getting Started

### 1. Clone the repository
```sh
git clone git@github.com:huy2212/todosapp.git
cd todosapp
```

### 2. Set up environment variables
Create a `.env` file and add your MongoDB connection string:
```
MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
```

### 3. Run with Docker Compose
```sh
docker-compose up --build
```

The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /api/todos` — Retrieve all todos
- `POST /api/todos` — Create a new todo (JSON body: `{ "text": "Your task" }`)

## Technologies Used
- Node.js
- Express
- MongoDB
- Docker
- Docker Compose

## License
MIT
