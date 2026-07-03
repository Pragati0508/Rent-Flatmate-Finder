import express from "express";

import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllListingsAdmin,
  deleteListingAdmin,
  getAnalytics,
} from "../controllers/admin.controller.js";
import {
  exportUsers,
  exportListings,
  exportInterests,
} from "../controllers/export.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/*
=========================================
Dashboard
=========================================
*/

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

/*
=========================================
Analytics
=========================================
*/

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  getAnalytics
);

/*
=========================================
Users
=========================================
*/

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  deleteUser
);

/*
=========================================
Listings
=========================================
*/

router.get(
  "/listings",
  protect,
  authorize("admin"),
  getAllListingsAdmin
);

router.delete(
  "/listings/:id",
  protect,
  authorize("admin"),
  deleteListingAdmin
);
/*
=========================================
Export Reports
=========================================
*/

router.get(
  "/export/users",
  protect,
  authorize("admin"),
  exportUsers
);

router.get(
  "/export/listings",
  protect,
  authorize("admin"),
  exportListings
);

router.get(
  "/export/interests",
  protect,
  authorize("admin"),
  exportInterests
);

export default router;