# 🏠 RoomMate AI – Rent & Flatmate Finder

An AI-powered Room & Flatmate Finder platform built as part of the Unthinkable Software Assignment.

The platform allows Owners to post room listings and Tenants to discover compatible rooms using an AI-based compatibility engine. It also supports real-time chat, email notifications, role-based authentication, and an admin dashboard.

---

# 🚀 Live Demo

## Frontend (Vercel)

https://rent-flatmate-finder-cu3obo102-pragati-patels-projects.vercel.app

## Backend API (Render)

https://roommate-ai-backend-hwmw.onrender.com

---

# ✨ Features

## Authentication

- Owner Registration & Login
- Tenant Registration & Login
- Admin Login
- JWT Authentication
- Role Based Authorization

---

## Owner Features

- Create Room Listings
- Upload Room Images
- Edit Listings
- Delete Listings
- View Interest Requests
- Accept / Reject Requests
- Mark Listing as Filled
- Dashboard Statistics

---

## Tenant Features

- Create Tenant Profile
- Browse Listings
- Filter Listings
- AI Compatibility Matching
- Send Interest Request
- Real-Time Chat
- View Request Status
- Dashboard

---

## AI Compatibility Engine

- Gemini LLM Integration
- Compatibility Score (0–100)
- AI Explanation
- Rule-Based Fallback if AI fails
- Scores Stored in Database

---

## Real-Time Chat

- Socket.IO
- Persistent Messages
- Owner ↔ Tenant Communication

---

## Email Notifications

- Owner receives email for high compatibility requests.
- Tenant receives email when request is accepted.
- Tenant receives email when request is rejected.

---

## Admin Panel

- Dashboard
- User Management
- Listing Management
- Platform Analytics
- Export Users
- Export Listings
- Export Interest Requests

---

# 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

### AI

- Google Gemini API

### Cloud

- Cloudinary

### Email

- Nodemailer

---

# Project Structure

```
client/
    src/
server/
    controllers/
    models/
    routes/
    middleware/
    services/
    socket/
    utils/
```

---

# Environment Variables

Create a `.env` file using `.env.example`.

Example:

```
PORT=5000

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

EMAIL_USER=
EMAIL_PASS=

GEMINI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Pragati0508/Rent-Flatmate-Finder.git
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# API Modules

- Authentication
- Listings
- Tenant Profile
- AI Compatibility
- Interest Requests
- Real-Time Chat
- Admin Dashboard

---

# Database Collections

- Users
- Listings
- Tenant Profiles
- Compatibility
- Interests
- Messages

---

# LLM Prompt

```
Given this room listing and tenant profile,
calculate a compatibility score between 0-100.

Return:

{
  "score": number,
  "explanation": string
}
```

---

# Deployment

Frontend

Vercel

Backend

Render

---

# Author

**Pragati Patel**

GitHub

https://github.com/Pragati0508

LinkedIn

https://www.linkedin.com/in/pragati-patel-2a3b54318/

---

# License

This project was developed for the Unthinkable Software Engineering Assignment.
