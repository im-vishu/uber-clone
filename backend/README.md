# 📌 User Registration API

## POST `/user/register`

Registers a new user and returns an authentication token.

This endpoint validates user input, hashes the password, creates a new user record, and generates a JWT token for authentication.

---

## 🧾 Description

The registration endpoint allows new users to create an account.

### What happens when this endpoint is called:

1. Request body is validated.
2. Password is hashed securely.
3. User is saved in the database.
4. JWT authentication token is generated.
5. Token & user details are returned.

---

## 📥 Request

### Content-Type

application/json

### Required Fields

| Field     | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| firstname | string | ✅       | First name (minimum 3 characters)    |
| lastname  | string | ✅       | Last name (minimum 3 characters)     |
| email     | string | ✅       | Valid email address (must be unique) |
| password  | string | ✅       | Password (minimum 6 characters)      |

---

## 🧪 Example Request

```json
{
  "firstname": "Vishu",
  "lastname": "Kumar",
  "email": "vishu@example.com",
  "password": "securePass123"
}
📤 Success Response
✅ 201 Created
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "65e8abc123",
    "fullname": {
      "firstname": "Vishu",
      "lastname": "Kumar"
    },
    "email": "vishu@example.com"
  }
}
❌ Error Responses
🔴 400 Bad Request — Validation Error

Returned when required fields are missing or invalid.

{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email"
    }
  ]
}

Possible validation errors:

Invalid email format

First name less than 3 characters

Password less than 6 characters

🔴 500 Internal Server Error

Returned if server or database fails.

{
  "message": "Internal Server Error"
}
🔐 Security Notes

Passwords are hashed using bcrypt before storage.

JWT token is generated for authentication.

Password field is never returned in the response.

Always use HTTPS in production.

⚠️ Important Notes

✔ Email must be unique
✔ Password is securely encrypted
✔ Store the token securely on the client side
✔ Use HTTPS in production

📦 Endpoint Summary
Method	Endpoint	Description
POST	/user/register	Register a new user
🛠 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

bcrypt

JSON Web Token (JWT)

express-validator

📁 Example Project Structure
project-root/
│
├── routes/
│   └── user.routes.js
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── services/
│   └── user.service.js
└── app.js
🚀 Usage

Send a POST request to:

http://localhost:PORT/user/register

Using tools like:

Postman

Thunder Client

curl

frontend application

🧪 Testing with curl
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "firstname":"Vishant",
  "lastname":"Chaudhary",
  "email":"vishantchoudhary2003@gmail.com",
  "password":"securePass123"
}'
👨‍💻 Author

Built for learning and production-ready authentication systems.


---

If you want, I can next:

✅ Create **login endpoint README**  
✅ Generate **Swagger docs**  
✅ Review your code for bugs & improvements  
✅ Help you deploy this API  

Just tell me 👍