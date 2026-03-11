# 🚗 Ride-Hailing Frontend

A React-based frontend for a ride-hailing application, built with Vite, TailwindCSS, and React Router. Supports two user flows: **Users** (riders) and **Captains** (drivers).

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routing](#pages--routing)
- [State Management](#state-management)
- [Styling](#styling)
- [Known Issues & Bugs](#known-issues--bugs)

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 (beta) | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| PostCSS + Autoprefixer | CSS processing |
| ESLint | Code linting |

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── context/
│   │   └── userContext.jsx      # Global user state (React Context)
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── UserLogin.jsx        # User login form
│   │   ├── UserSignup.jsx       # User registration form
│   │   ├── CaptainLogin.jsx     # Captain login form
│   │   └── CaptainSignup.jsx    # Captain registration form
│   ├── App.jsx                  # Route definitions
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # App entry point
│   └── index.css                # Tailwind directives
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.19.0 (required by Vite 8 and React Router v7)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🗺 Pages & Routing

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with "Get Started" CTA |
| `/login` | `UserLogin` | User email/password login |
| `/signup` | `UserSignup` | User registration with name, email, password |
| `/captain-login` | `CaptainLogin` | Captain email/password login |
| `/captain-signup` | `CaptainSignup` | Captain registration form |

### Page Descriptions

**Home** — Full-screen background image with a logo and a "Continue" button that navigates to the user login page.

**UserLogin / CaptainLogin** — Email and password forms with links to the respective signup pages. The captain login page also has a "Sign in as User" button and vice versa.

**UserSignup / CaptainSignup** — Registration forms collecting first name, last name, email, and password. Form state is managed locally with `useState`.

---

## 🧠 State Management

Global user state is managed via React Context in `src/context/userContext.jsx`. The context stores:

```js
{
  email: '',
  fullName: {
    firstName: '',
    lastName: ''
  }
}
```

The `UserDataContext` is intended to wrap the entire app via `main.jsx` so all components can access and update the logged-in user's data.

---

## 🎨 Styling

This project uses **Tailwind CSS** for all component-level styling. The configuration targets all JSX/TSX files in `src/`:

```js
// tailwind.config.js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

PostCSS is configured with `tailwindcss` and `autoprefixer` plugins.

---

## ⚠️ Known Issues & Bugs

The following bugs exist in the current codebase and must be fixed before the app will work correctly:

1. **`userContext.jsx` — Missing imports:** `createContext` and `useState` are used but never imported from React. Add `import React, { createContext, useState } from 'react'`.

2. **`userContext.jsx` — Context used as component:** `<UserDataContext>` is rendered directly as a JSX element instead of `<UserDataContext.Provider value={...}>`. The context value is also never passed down to consumers.

3. **`main.jsx` — `UserContext` not imported:** `<UserContext>` is used in `main.jsx` but never imported. Add `import UserContext from './context/userContext'`.

4. **`UserLogin.jsx` & `CaptainLogin.jsx` — Hooks inside `useState` callback:** All `useState` and handler logic is incorrectly placed inside a `useState(() => { ... })` call instead of at the top level of the component. This violates the Rules of Hooks and will throw a runtime error.

5. **`UserLogin.jsx` & `CaptainLogin.jsx` — `submitHandler` called immediately:** `onSubmit={submitHandler(e)}` calls the function immediately on render rather than passing it as a reference. It should be `onSubmit={submitHandler}`.

6. **`UserLogin.jsx` — `<link>` instead of `<Link>`:** The "Sign in as Captain" button uses a lowercase `<link>` (an HTML element) instead of React Router's `<Link>` component.

7. **`App.jsx` — `CaptainSignup` not imported:** The `/captain-signup` route references `<CaptainSignup />` but the component is never imported at the top of the file.

8. **`UserSignup.jsx` & `CaptainSignup.jsx` — Missing React imports for hooks:** `useState` is used without being imported. Add `import { useState } from 'react'` at the top.

9. **`UserSignup.jsx` — Duplicate/incorrect label text:** The email field heading reads "What's your name" instead of "What's your email".

10. **Forms don't connect to the backend:** All form submissions currently only update local state. API calls to the backend registration and login endpoints (`POST /users/register`, `POST /users/login`, etc.) have not been implemented yet.

---

## 🔗 Backend Integration

This frontend is designed to work with the accompanying Express/MongoDB backend. The expected API base URL should be configured in an environment variable:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Key endpoints to integrate:

| Action | Method | Endpoint |
|---|---|---|
| Register user | POST | `/users/register` |
| Login user | POST | `/users/login` |
| Register captain | POST | `/captains/register` |
| Login captain | POST | `/captains/login` |

---

## 👨‍💻 Author

Built for learning full-stack development with React, Vite, and a Node.js/Express backend.