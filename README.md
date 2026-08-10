# 🚀 DevNotes AI

> **AI-Powered Smart Notes Application** built with the MERN Stack and AI APIs to help developers create, manage, and understand their notes faster.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

# 🌐 Live Demo

### 🖥 Frontend

https://dev-notes-ai-sigma.vercel.app

### ⚙ Backend API

https://devnotes-ai-backend.onrender.com

---

# 📌 About

DevNotes AI is a full-stack AI-powered note-taking application designed for students and developers.

Users can securely create and manage notes while using AI to instantly:

- Explain difficult concepts
- Generate concise summaries

The application uses JWT Authentication, MongoDB Atlas, REST APIs, and AI integration to provide a modern developer-focused experience.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Protected Routes
- Logout

---

## 📝 Notes Management

- Create Notes
- Edit Notes
- Delete Notes
- View All Notes

---

## 🤖 AI Features

- AI Explain
- AI Summarize

---

## 🎨 Frontend

- Modern Responsive UI
- Built using Next.js 16
- Fast Navigation
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcryptjs

## AI

- OpenAI API
- Groq API

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📁 Project Structure

```
DevNotes-AI
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   ├── package.json
│   └── .env.local
│
└── README.md
```

---

# 📷 Screenshots

## Landing Page

<img width="1899" height="825" alt="image" src="https://github.com/user-attachments/assets/a456b6b7-915a-40db-9259-07c64ad23c09" />

---

## Login

<img width="947" height="414" alt="image" src="https://github.com/user-attachments/assets/acb4cbb3-9324-4dd5-ab6c-11476bb195e9" />


---

## Dashboard

<img width="950" height="413" alt="image" src="https://github.com/user-attachments/assets/d7991138-c8c8-4c29-b7cf-173e2147de0f" />


---

## AI Explain

_Add Screenshot Here_

---

## AI Summarize

<img width="947" height="410" alt="image" src="https://github.com/user-attachments/assets/0d81e1bb-1534-4ce9-bd7f-ad19e2168627" />


---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Abhijeetpal123/DevNotes-AI.git
```

```bash
cd DevNotes-AI
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

OPENAI_API_KEY=YOUR_OPENAI_KEY
```

Run server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_URL=http://localhost:5000
```

Run frontend

```bash
npm run dev
```

---

# 📡 API Overview

## Authentication

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Notes

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | /api/notes | Get All Notes |
| POST | /api/notes | Create Note |
| PUT | /api/notes/:id | Update Note |
| DELETE | /api/notes/:id | Delete Note |

---

## AI

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | /api/ai/explain | Explain Notes |
| POST | /api/ai/summarize | Summarize Notes |

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- Environment Variables
- MongoDB Atlas

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🎯 Future Improvements

- Search Notes
- AI Flashcards
- AI Interview Questions
- Markdown Support
- Export Notes as PDF
- Dark / Light Theme
- Public Share Links
- Rich Text Editor

---

# 👨‍💻 Author

**Abhijeet Pal**

GitHub

https://github.com/Abhijeetpal123

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates me to build more projects.

---

## 📄 License

This project is licensed under the MIT License.
