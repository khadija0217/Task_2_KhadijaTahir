# Project 2: MNTN Backend API

A simple backend server built with **Node.js** and **Express**, created as part of the DecodeLabs Full Stack Internship program. This backend handles user **signup** and **login** functionality for the MNTN hiking website frontend (Project 1).

---

## 📌 About This Project

This is the backend/API layer that powers the authentication system of the MNTN landing page. It receives data from the frontend forms (`signup.html`, `login.html`), validates it, stores it, and sends responses back — demonstrating a complete client-server communication cycle.

**Note:** This is a learning/practice project. User data is currently stored in-memory (a JavaScript array), which means all data resets when the server restarts. This is intentional for the current stage of development.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for running the server |
| **Express.js** | Web framework for building routes/APIs |
| **CORS** | Allows the frontend (different origin/port) to communicate with this backend |

---

## 📂 Project Structure

```
project_2/
  ├── node_modules/       (installed automatically by npm)
  ├── package.json
  ├── package-lock.json
  └── server.js           (main backend file)
```

---

## ⚙️ Setup Instructions

### 1. Install Node.js
Download and install from [nodejs.org](https://nodejs.org) if not already installed.

### 2. Install Dependencies
Navigate into the project folder and run:

```bash
npm install
```

This will install `express` and `cors` based on `package.json`.

### 3. Start the Server

```bash
node server.js
```

You should see in the terminal:

```
Server chal raha hai: http://localhost:3000
```

### 4. Test in Browser
Open [http://localhost:3000](http://localhost:3000) — you should see:

```
Hello! Backend server chal raha hai.
```

---

## 🔌 API Endpoints

### `GET /`
Basic health-check route to confirm the server is running.

**Response:**
```
Hello! Backend server chal raha hai.
```

---

### `POST /signup`
Registers a new user.

**Request Body (JSON):**
```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "mypassword123"
}
```

**Success Response — `201 Created`:**
```json
{
  "message": "Signup successful!"
}
```

**Error Responses — `400 Bad Request`:**
```json
{ "message": "All feild are important." }
```
```json
{ "message": "this mail is already registered." }
```

---

### `POST /login`
Authenticates an existing user.

**Request Body (JSON):**
```json
{
  "email": "ali@example.com",
  "password": "mypassword123"
}
```

**Success Response — `200 OK`:**
```json
{
  "message": "Welcome back, Ali Khan!"
}
```

**Error Responses:**

`400 Bad Request` — missing fields:
```json
{ "message": "Email or password are important." }
```

`401 Unauthorized` — wrong credentials:
```json
{ "message": "Email or password are wrong." }
```

---

## 🔗 Frontend Connection

The frontend (`script.js` in the Project 1 folder) connects to this backend using the `fetch()` API:

```javascript
const response = await fetch('http://localhost:3000/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});
```

**Important:** The backend server must be running (`node server.js`) for the frontend forms to work.

---

## ⚠️ Current Limitations (By Design — Learning Stage)

- ❌ **No real database** — data is stored in a temporary array and is lost on server restart
- ❌ **Passwords are stored in plain text** — not secure for production
- ❌ **No sessions/tokens** — the app doesn't "remember" a logged-in user after page reload
- ❌ **No Google/OAuth login** — planned for a future stage

---

## 🚀 Planned Next Steps

1. **Connect a real database** (e.g., MongoDB) so user data persists permanently
2. **Hash passwords** using a library like `bcrypt` for security
3. **Add sessions or JWT tokens** to keep users logged in across page reloads
4. **Implement "Login with Google"** (OAuth) as an alternative sign-in method
5. Additional features: forgot password, user profile page, logout functionality

---

## 👩‍💻 Learning Concepts Covered

- What a backend server is and how it differs from the frontend
- Node.js & Express basics (`app.get`, `app.post`, `app.listen`)
- Middleware (`express.json()`, `cors()`)
- HTTP methods: GET vs POST
- HTTP status codes (200, 201, 400, 401)
- Request/response cycle (`req.body`, `res.json()`)
- Connecting frontend to backend using `fetch()`, `async/await`, and `try/catch`
- Basic input validation (both frontend and backend)

---

## 📄 License

This project is for educational purposes as part of the DecodeLabs Internship Program.
