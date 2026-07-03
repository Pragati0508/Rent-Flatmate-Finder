import fs from "fs";
import Listing from "../models/Listing.js";
import cloudinary from "../config/cloudinary.js";

/*
========================================
Create Listing
========================================
*/

export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      rent,
      availableFrom,
      roomType,
      furnishing,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !rent ||
      !availableFrom ||
      !roomType ||
      !furnishing
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let photos = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "roommate-ai",
        });

        photos.push(result.secure_url);

        fs.unlinkSync(file.path);
      }
    }

    const listing = await Listing.create({
      owner: req.user._id,
      title,
      description,
      location,
      rent,
      availableFrom,
      roomType,
      furnishing,
      photos,
    });

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Owner Listings
========================================
*/

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Public Listings + Filters
========================================
*/

export const getAllListings = async (req, res) => {
  try {
    const { location, minBudget, maxBudget } = req.query;

    let filter = {
      isFilled: false,
    };

    if (location && location.trim() !== "") {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (minBudget || maxBudget) {
      filter.rent = {};

      if (minBudget) {
        filter.rent.$gte = Number(minBudget);
      }

      if (maxBudget) {
        filter.rent.$lte = Number(maxBudget);
      }
    }

    const listings = await Listing.find(filter)
      .populate("owner", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Single Listing
========================================
*/

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("owner", "fullName email");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Update Listing
========================================
*/

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let photos = listing.photos;

    if (req.files && req.files.length > 0) {
      photos = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "roommate-ai",
        });

        photos.push(result.secure_url);

        fs.unlinkSync(file.path);
      }
    }

    listing.title = req.body.title || listing.title;
    listing.description =
      req.body.description || listing.description;
    listing.location =
      req.body.location || listing.location;
    listing.rent = req.body.rent || listing.rent;
    listing.availableFrom =
      req.body.availableFrom || listing.availableFrom;
    listing.roomType =
      req.body.roomType || listing.roomType;
    listing.furnishing =
      req.body.furnishing || listing.furnishing;
    listing.photos = photos;

    await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing Updated",
      listing,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Delete Listing
========================================
*/

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: "Listing Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
========================================
Mark Listing Filled
========================================
*/

export const markFilled = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    listing.isFilled = true;

    await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing marked as filled",
      listing,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};