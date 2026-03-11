# 🚗 Ride-Hailing Backend API

A RESTful backend API for a ride-hailing application built with Node.js, Express, MongoDB, and JWT authentication. Supports two user types: **Users** (riders) and **Captains** (drivers).

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Known Issues & Bugs](#known-issues--bugs)

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | Web framework |
| MongoDB + Mongoose | Database & ODM |
| bcrypt / bcryptjs | Password hashing |
| JSON Web Token (JWT) | Authentication |
| express-validator | Request validation |
| cookie-parser | Cookie handling |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
backend/
├── controllers/
│   ├── user.controller.js       # User business logic
│   └── captain.controller.js    # Captain business logic
├── db/
│   └── db.js                    # MongoDB connection
├── middlewares/
│   └── auth.middleware.js       # JWT auth guards
├── models/
│   ├── user.model.js            # User schema
│   ├── captain.model.js         # Captain schema
│   └── blacklistToken.model.js  # Token blacklist (logout)
├── routes/
│   ├── user.routes.js           # User route definitions
│   └── captain.routes.js        # Captain route definitions
├── services/
│   ├── user.service.js          # User DB operations
│   └── captain.service.js       # Captain DB operations
├── app.js                       # Express app setup
├── server.js                    # HTTP server entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in your values (see Environment Variables section)

# Start the server
node server.js
```

The server runs on `http://localhost:4000` by default.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` root:

```env
PORT=4000
DB_CONNECT=mongodb://localhost:27017/ridehailing
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

---

## 📡 API Reference

### User Endpoints

#### `POST /users/register`

Register a new user account.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

**Validation Rules:**
- `fullname.firstname` — minimum 3 characters
- `fullname.lastname` — minimum 3 characters
- `email` — must be a valid email address
- `password` — minimum 6 characters

**Success Response `201`:**
```json
{
  "user": { "_id": "...", "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john@example.com" },
  "token": "<JWT_TOKEN>"
}
```

---

#### `POST /users/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response `200`:**
```json
{
  "user": { ... },
  "token": "<JWT_TOKEN>"
}
```

Sets an `httpOnly` cookie named `token` (expires in 24 hours).

---

#### `GET /users/profile`

Get the authenticated user's profile. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response `200`:**
```json
{
  "user": { "_id": "...", "fullname": { ... }, "email": "..." }
}
```

---

#### `GET /users/logout`

Log out the current user and blacklist the token. **Requires authentication.**

**Success Response `200`:**
```json
{ "message": "Logged out successfully" }
```

---

### Captain Endpoints

#### `POST /captains/register`

Register a new captain (driver) account.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Driver"
  },
  "email": "jane@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation Rules:**
- `fullname.firstname` — minimum 3 characters
- `fullname.lastname` — minimum 3 characters
- `email` — must be a valid email address
- `password` — minimum 6 characters
- `vehicle.color` — required
- `vehicle.plate` — required, must be unique
- `vehicle.capacity` — required, minimum 1
- `vehicle.vehicleType` — must be `car`, `motorcycle`, or `auto`

**Success Response `201`:**
```json
{
  "captain": { "_id": "...", "fullname": { ... }, "email": "...", "vehicle": { ... } },
  "token": "<JWT_TOKEN>"
}
```

---

#### `POST /captains/login`

Authenticate an existing captain.

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Success Response `200`:**
```json
{
  "captain": { ... },
  "token": "<JWT_TOKEN>"
}
```

Sets a `token` cookie on the response.

---

#### `GET /captains/profile`

Get the authenticated captain's profile. **Requires authentication.**

**Success Response `200`:**
```json
{
  "captain": { "_id": "...", "fullname": { ... }, "email": "...", "vehicle": { ... }, "status": "offline" }
}
```

---

#### `GET /captains/logout`

Log out the captain and blacklist the token. **Requires authentication.**

**Success Response `200`:**
```json
{ "message": "Logged out successfully" }
```

---

## 🔒 Authentication

All protected routes require a valid JWT token, passed either as:

- **Cookie:** `token=<JWT_TOKEN>`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`

Tokens expire after **24 hours**. Logged-out tokens are stored in a blacklist collection (auto-deleted after 24h via MongoDB TTL index).

---

## ❌ Error Handling

**Validation Error `400`:**
```json
{
  "errors": [
    { "msg": "Please provide a valid email address", "param": "email" }
  ]
}
```

**Duplicate User/Captain `400`:**
```json
{ "message": "User already exists" }
```

**Unauthorized `401`:**
```json
{ "message": "Invalid email or password" }
```

**Invalid/Missing Token `401`:**
```json
{ "message": "No token provided, authorization denied" }
```

---

## ⚠️ Known Issues & Bugs

The following bugs exist in the current codebase and should be fixed before production use:

1. **`app.js` — Middleware order:** `express.json()` and `express.urlencoded()` are registered *after* the user routes, meaning the `/users` endpoints cannot parse JSON request bodies. Move these lines to before any route registration.

2. **`user.model.js` — `comparePassword` binding:** `userSchema.comparePassword` is assigned directly on the schema object instead of `userSchema.methods.comparePassword`, so it won't be available on model instances.

3. **`user.service.js` — `new` keyword on `.create()`:** `new userModel.create(...)` is invalid. Use `userModel.create(...)` directly (no `new`). Also `new error(...)` should be `new Error(...)`.

4. **`captain.model.js` — Typo:** `constSchema.methods.comparePassword` should be `captainSchema.methods.comparePassword`.

5. **`captain.model.js` — `generateAuthToken` signature mismatch:** The method uses `this._id` but the controller calls `captainModel.generateToken(captain._id)` as a static. These need to be aligned.

6. **`captain.model.js` — Missing `location` defaults:** The `location` field (`lat`, `lng`) is marked `required: true` but no default is provided, causing captain registration to fail unless coordinates are supplied.

7. **`blacklistToken.model.js` — `userId` required but never set:** The logout controllers don't pass a `userId` when creating blacklist records, causing logout to fail due to schema validation.

---

## 👨‍💻 Author

Built for learning production-ready authentication systems with Node.js and Express.