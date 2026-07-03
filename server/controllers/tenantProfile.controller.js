import TenantProfile from "../models/TenantProfile.js";

/*
====================================
Create / Update Profile
====================================
*/

export const saveProfile = async (req, res) => {
  try {
    const {
      preferredLocation,
      minBudget,
      maxBudget,
      moveInDate,
    } = req.body;

    let profile = await TenantProfile.findOne({
      tenant: req.user._id,
    });

    if (profile) {
      profile.preferredLocation = preferredLocation;
      profile.minBudget = minBudget;
      profile.maxBudget = maxBudget;
      profile.moveInDate = moveInDate;

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        profile,
      });
    }

    profile = await TenantProfile.create({
      tenant: req.user._id,
      preferredLocation,
      minBudget,
      maxBudget,
      moveInDate,
    });

    res.status(201).json({
      success: true,
      message: "Profile Created Successfully",
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
====================================
Get Profile
====================================
*/

export const getProfile = async (req, res) => {
  try {
    const profile = await TenantProfile.findOne({
      tenant: req.user._id,
    });

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