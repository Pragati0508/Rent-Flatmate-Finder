import mongoose from "mongoose";
import Interest from "../models/Interest.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";
import interestTemplate from "../templates/interestTemplate.js";
import acceptedTemplate from "../templates/acceptedTemplate.js";
import rejectedTemplate from "../templates/rejectedTemplate.js";
import Compatibility from "../models/Compatibility.js";

/*
=========================================
Tenant Sends Interest
=========================================
*/
export const sendInterest = async (req, res) => {
  try {
    const { listingId, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Listing ID",
      });
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.isFilled) {
      return res.status(400).json({
        success: false,
        message: "This listing is already filled.",
      });
    }

    const alreadySent = await Interest.findOne({
      tenant: req.user._id,
      listing: listingId,
    });

    if (alreadySent) {
      return res.status(400).json({
        success: false,
        message: "Interest already sent.",
      });
    }

    const interest = await Interest.create({
      tenant: req.user._id,
      owner: listing.owner,
      listing: listingId,
      message,
    });

    console.log("✅ Interest Saved");
    console.log("Tenant :", req.user._id.toString());
    console.log("Owner  :", listing.owner.toString());
    console.log("Listing:", listingId);

    try {

  const owner = await User.findById(listing.owner);
  const tenant = await User.findById(req.user._id);

  // Get stored compatibility score
  const compatibility = await Compatibility.findOne({
    tenant: req.user._id,
    listing: listing._id,
  });

  if (compatibility && compatibility.score >= 80) {

    console.log(
      `✅ High Compatibility (${compatibility.score})`
    );

    await sendEmail({
      to: owner.email,
      subject: "New High Compatibility Interest - RoomMate AI",
      html: interestTemplate(
        owner.fullName,
        tenant.fullName,
        listing.title
      ),
    });

    console.log("✅ Interest Email Sent");

  } else {

    console.log(
      `ℹ Compatibility Score ${
        compatibility?.score || 0
      } (<80). Email not sent.`
    );

  }

} catch (emailError) {

  console.log("Email Error:", emailError.message);

}

    return res.status(201).json({
      success: true,
      message: "Interest sent successfully",
      interest,
    });

  } catch (error) {
    console.error("Send Interest Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Owner Views Requests
=========================================
*/
export const ownerRequests = async (req, res) => {
  try {

    console.log("=================================");
    console.log("OWNER REQUEST API HIT");
    console.log("Logged In Owner:", req.user._id.toString());

    const requests = await Interest.find({
      owner: req.user._id,
    })
      .populate("tenant", "fullName email")
      .populate("listing", "title location rent");

    console.log("Requests Found:", requests.length);

    console.log(
      requests.map((r) => ({
        id: r._id,
        owner: r.owner.toString(),
        tenant: r.tenant,
        status: r.status,
      }))
    );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {

    console.error("Owner Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

/*
=========================================
Tenant Views Requests
=========================================
*/
export const tenantRequests = async (req, res) => {
  try {

    const requests = await Interest.find({
      tenant: req.user._id,
    })
      .populate("listing", "title location rent")
      .populate("owner", "fullName email");

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {

    console.error("Tenant Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

/*
=========================================
Owner Accept / Reject
=========================================
*/
export const updateInterestStatus = async (req, res) => {
  try {

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be accepted or rejected.",
      });
    }

    const interest = await Interest.findById(req.params.id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest request not found",
      });
    }

    if (interest.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized.",
      });
    }

    interest.status = status;
    await interest.save();

    console.log("✅ Request Updated");
    console.log("Interest:", interest._id.toString());
    console.log("Status:", status);

    try {
      const tenant = await User.findById(interest.tenant);
      const listing = await Listing.findById(interest.listing);

      if (status === "accepted") {
        await sendEmail({
          to: tenant.email,
          subject: "Your Room Request has been Accepted 🎉",
          html: acceptedTemplate(
            tenant.fullName,
            listing.title
          ),
        });
      }

      if (status === "rejected") {
        await sendEmail({
          to: tenant.email,
          subject: "Room Request Update",
          html: rejectedTemplate(
            tenant.fullName,
            listing.title
          ),
        });
      }

    } catch (emailError) {
      console.log("Email Error:", emailError.message);
    }

    return res.status(200).json({
      success: true,
      message: `Interest ${status} successfully.`,
      interest,
    });

  } catch (error) {

    console.error("Update Interest Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};