import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Interest from "../models/Interest.js";
import Message from "../models/Message.js";

/*
=========================================
Admin Dashboard
=========================================
*/

export const getDashboardStats = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalOwners =
      await User.countDocuments({
        role: "owner",
      });

    const totalTenants =
      await User.countDocuments({
        role: "tenant",
      });

    const totalListings =
      await Listing.countDocuments();

    const filledListings =
      await Listing.countDocuments({
        isFilled: true,
      });

    const totalInterests =
      await Interest.countDocuments();

    const totalMessages =
      await Message.countDocuments();

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalOwners,
        totalTenants,
        totalListings,
        filledListings,
        totalInterests,
        totalMessages,
      },
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
=========================================
All Users
=========================================
*/

export const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
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
=========================================
Delete User
=========================================
*/

export const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted",
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
=========================================
All Listings
=========================================
*/

export const getAllListingsAdmin =
  async (req, res) => {

    try {

      const listings =
        await Listing.find()
          .populate(
            "owner",
            "fullName email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: listings.length,
        listings,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });

    }

  };

/*
=========================================
Delete Listing
=========================================
*/

export const deleteListingAdmin =
  async (req, res) => {

    try {

      const listing =
        await Listing.findById(
          req.params.id
        );

      if (!listing) {

        return res.status(404).json({
          success: false,
          message:
            "Listing not found",
        });

      }

      await listing.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Listing Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });

    }

  };
  /*
=========================================
Analytics
=========================================
*/

export const getAnalytics = async (req, res) => {
  try {
    // Users by Role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly Users
    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Monthly Listings
    const monthlyListings = await Listing.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Available vs Filled Listings
    const listingStatus = {
      available: await Listing.countDocuments({
        isFilled: false,
      }),

      filled: await Listing.countDocuments({
        isFilled: true,
      }),
    };

    // Monthly Interests
    const monthlyInterests = await Interest.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Monthly Messages
    const monthlyMessages = await Message.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,

      analytics: {
        usersByRole,
        monthlyUsers,
        monthlyListings,
        listingStatus,
        monthlyInterests,
        monthlyMessages,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};