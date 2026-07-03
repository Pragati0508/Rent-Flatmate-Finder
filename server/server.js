import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import connectDB from "./config/db.js";
import createDefaultAdmin from "./utils/createAdmin.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import tenantProfileRoutes from "./routes/tenantProfile.routes.js";
import compatibilityRoutes from "./routes/compatibility.routes.js";
import interestRoutes from "./routes/interest.routes.js";
import messageRoutes from "./routes/message.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Socket
import { initSocket } from "./socket/socket.js";

dotenv.config();

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);
console.log(
  "GEMINI =",
  process.env.GEMINI_API_KEY ? "Loaded" : "Not Loaded"
);

console.log(
  "CLOUDINARY_CLOUD_NAME =",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "CLOUDINARY_API_KEY =",
  process.env.CLOUDINARY_API_KEY
);

console.log(
  "CLOUDINARY_API_SECRET =",
  process.env.CLOUDINARY_API_SECRET
    ? "Loaded"
    : "Not Loaded"
);

// =======================
// Connect MongoDB
// =======================

await connectDB();

// =======================
// Create Default Admin
// =======================

await createDefaultAdmin();

const app = express();

// =======================
// Create HTTP Server
// =======================

const server = http.createServer(app);

// =======================
// Initialize Socket
// =======================

initSocket(server);

// =======================
// Middlewares
// =======================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// =======================
// Routes
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/tenant", tenantRoutes);

app.use("/api/profile", tenantProfileRoutes);

app.use("/api/compatibility", compatibilityRoutes);

app.use("/api/interests", interestRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/admin", adminRoutes);

// =======================
// Home
// =======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 RoomMate AI Backend Running Successfully",
  });
});

// =======================
// 404
// =======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});