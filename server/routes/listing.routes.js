import express from "express";

import {
  createListing,
  getMyListings,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  markFilled,
} from "../controllers/listing.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/*
========================================
Public Routes
========================================
*/

router.get("/", getAllListings);

router.get("/:id", getListingById);

/*
========================================
Owner Routes
========================================
*/

// Create Listing
router.post(
  "/",
  protect,
  authorize("owner"),
  upload.array("photos", 5),
  createListing
);

// Owner Listings
router.get(
  "/owner/my-listings",
  protect,
  authorize("owner"),
  getMyListings
);

// Update Listing
router.put(
  "/:id",
  protect,
  authorize("owner"),
  upload.array("photos", 5),
  updateListing
);

// Delete Listing
router.delete(
  "/:id",
  protect,
  authorize("owner"),
  deleteListing
);

// Mark Listing Filled
router.patch(
  "/:id/fill",
  protect,
  authorize("owner"),
  markFilled
);

export default router;