# System Design – RoomMate AI

## Overview

RoomMate AI is a full-stack web application that connects room owners with tenants using AI-powered compatibility scoring. The system enables owners to list available rooms and tenants to create preference-based profiles. Based on tenant preferences and room details, the application generates compatibility scores using Google's Gemini LLM.

---

## Architecture

The application follows a three-tier architecture:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas

Communication between frontend and backend is performed using REST APIs. Real-time messaging is implemented using Socket.IO over WebSockets.

---

## Compatibility Scoring

When a tenant requests AI matches:

1. Tenant profile is fetched.
2. Available listings are retrieved.
3. Gemini receives both objects.
4. Gemini returns:

- Compatibility Score (0–100)
- Explanation

The score and explanation are stored in the Compatibility collection to avoid repeated API calls.

---

## LLM Fallback

If Gemini API is unavailable or returns an error, the application automatically switches to a rule-based scoring system.

Example:

- Same Location → +50
- Budget Match → +50

This guarantees uninterrupted functionality.

---

## Real-Time Chat

When an owner accepts an interest request:

- Chat becomes available.
- Socket.IO establishes a WebSocket connection.
- Messages are stored in MongoDB.
- Previous messages are loaded when the conversation is reopened.

---

## Notification Flow

### Owner Notification

If a tenant with an AI compatibility score above 80 sends an interest request:

- Email is automatically sent to the owner.

### Tenant Notification

When the owner:

- Accepts request → Acceptance email
- Rejects request → Rejection email

Emails are delivered using Nodemailer.

---

## Database Design

Collections:

- Users
- Listings
- TenantProfiles
- Compatibility
- Interests
- Messages

Relationships are maintained using MongoDB ObjectIds.

---

## Security

- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Password Hashing using bcrypt
- Environment Variables for sensitive credentials

---

## Conclusion

The application combines AI, real-time communication, secure authentication, cloud image storage, and email notifications into a scalable room rental platform that satisfies all assignment requirements.