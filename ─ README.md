# 🏠 RoomMate AI - Rent & Flatmate Finder

An AI-powered Room & Flatmate Finder platform developed as part of the Unthinkable Assignment.

---

# Features

## Authentication

- Owner Registration/Login
- Tenant Registration/Login
- Admin Login
- JWT Authentication
- Role Based Authorization

---

## Owner Features

- Create Listing
- Edit Listing
- Delete Listing
- Upload Multiple Photos (Cloudinary)
- Mark Listing Filled
- Manage Interest Requests

---

## Tenant Features

- Browse Listings
- Filter by Location
- Filter by Budget
- AI Compatibility Score
- Send Interest Request
- Real-time Chat
- Tenant Profile

---

## AI Compatibility

Uses Google Gemini API.

Returns

- Compatibility Score (0-100)
- AI Explanation

If Gemini is unavailable, the system automatically switches to a rule-based fallback.

---

## Notifications

- Email to owner for compatibility score above 80%
- Email to tenant when request is accepted
- Email to tenant when request is rejected

---

## Admin Features

- Dashboard
- User Management
- Listing Management
- Analytics Dashboard
- Export CSV

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Socket.IO
- Cloudinary
- Nodemailer
- Google Gemini API

---

# Folder Structure

```
client/
server/
.env.example
README.md
```

---

# Environment Variables

Create a `.env` file inside the server folder.

Required variables:

```
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

GEMINI_API_KEY=

EMAIL_USER=

EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# Installation

Clone Repository

```
git clone https://github.com/Pragati0508/Rent-Flatmate-Finder.git
```

Install Client

```
cd client
npm install
```

Install Server

```
cd ../server
npm install
```

Run Backend

```
npm run dev
```

Run Frontend

```
npm run dev
```

---

# API Endpoints

Authentication

```
POST /api/auth/register
POST /api/auth/login
```

Listings

```
GET /api/listings
POST /api/listings
PUT /api/listings/:id
DELETE /api/listings/:id
```

Compatibility

```
GET /api/compatibility/matches
```

Interest

```
POST /api/interests
GET /api/interests/owner
GET /api/interests/tenant
```

Messages

```
GET /api/messages
POST /api/messages
```

Admin

```
GET /api/admin/dashboard
GET /api/admin/users
GET /api/admin/listings
```

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
Given this room listing and tenant profile, compute a compatibility score from 0 to 100.

Return JSON:

{
 score: number,
 explanation: string
}
```

Example Output

```
{
 "score":92,
 "explanation":"Excellent location and budget match."
}
```

---

# Future Improvements

- Video Calling
- Payment Integration
- Push Notifications
- Advanced AI Recommendations

---

# Author

Pragati Patel

B.Tech CSE (AI)

PSIT Kanpur