import TenantProfile from "../models/TenantProfile.js";

/*
=======================================
Create Tenant Profile
=======================================
*/

export const createProfile = async (req, res) => {
  try {
    const {
      preferredLocation,
      minBudget,
      maxBudget,
      moveInDate,
    } = req.body;

    if (
      !preferredLocation ||
      !minBudget ||
      !maxBudget ||
      !moveInDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProfile = await TenantProfile.findOne({
      tenant: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await TenantProfile.create({
      tenant: req.user._id,
      preferredLocation,
      minBudget,
      maxBudget,
      moveInDate,
    });

    res.status(201).json({
      success: true,
      message: "Tenant profile created successfully",
      profile,
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
=======================================
Get Tenant Profile
=======================================
*/

export const getProfile = async (req, res) => {
  try {
    const profile = await TenantProfile.findOne({
      tenant: req.user._id,
    }).populate("tenant", "fullName email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=======================================
Update Profile
=======================================
*/

export const updateProfile = async (req, res) => {
  try {
    const profile = await TenantProfile.findOne({
      tenant: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const updated = await TenantProfile.findByIdAndUpdate(
      profile._id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};