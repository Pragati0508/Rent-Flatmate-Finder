import express from "express";

import {
  sendInterest,
  ownerRequests,
  tenantRequests,
  updateInterestStatus,
} from "../controllers/interest.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Tenant
router.post(
  "/",
  protect,
  authorize("tenant"),
  sendInterest
);

router.get(
  "/tenant",
  protect,
  authorize("tenant"),
  tenantRequests
);

// Owner
router.get(
  "/owner",
  protect,
  authorize("owner"),
  ownerRequests
);

router.patch(
  "/:id",
  protect,
  authorize("owner"),
  updateInterestStatus
);

export default router;