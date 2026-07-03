import express from "express";

import {
  saveProfile,
  getProfile,
} from "../controllers/tenantProfile.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("tenant"),
  getProfile
);

router.post(
  "/",
  protect,
  authorize("tenant"),
  saveProfile
);

export default router;