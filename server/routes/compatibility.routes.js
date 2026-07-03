import express from "express";

import { generateScores } from "../controllers/compatibility.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Tenant generates AI compatibility scores
router.get(
  "/matches",
  protect,
  authorize("tenant"),
  generateScores
);

export default router;