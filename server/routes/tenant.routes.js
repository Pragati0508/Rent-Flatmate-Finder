import express from "express";

import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/tenant.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Create Tenant Profile
router.post(
  "/profile",
  protect,
  authorize("tenant"),
  createProfile
);

// Get Logged-in Tenant Profile
router.get(
  "/profile",
  protect,
  authorize("tenant"),
  getProfile
);

// Update Tenant Profile
router.put(
  "/profile",
  protect,
  authorize("tenant"),
  updateProfile
);

export default router;