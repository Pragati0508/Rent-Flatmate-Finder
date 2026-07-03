import Listing from "../models/Listing.js";
import TenantProfile from "../models/TenantProfile.js";
import Compatibility from "../models/Compatibility.js";
import { generateCompatibility } from "../services/gemini.service.js";

export const generateScores = async (req, res) => {
  try {
    const tenantProfile = await TenantProfile.findOne({
      tenant: req.user._id,
    });

    if (!tenantProfile) {
      return res.status(404).json({
        success: false,
        message: "Please create your tenant profile first.",
      });
    }

    const listings = await Listing.find({
      isFilled: false,
    }).populate("owner", "fullName email");

    const results = [];

    for (const listing of listings) {

      let compatibility = await Compatibility.findOne({
        tenant: req.user._id,
        listing: listing._id,
      });

      if (!compatibility) {

        let aiResult;

        try {
          aiResult = await generateCompatibility(
            listing,
            tenantProfile
          );
        } catch (err) {
          console.log("Gemini Failed");
        }

        compatibility = await Compatibility.create({
          tenant: req.user._id,
          listing: listing._id,

          score: aiResult?.score ?? 60,

          explanation:
            aiResult?.explanation ??
            "Preferred location matches.",

          source:
            aiResult?.source ?? "fallback",
        });

      }

      results.push({
        listing,
        compatibility,
      });

    }

    results.sort(
      (a, b) =>
        b.compatibility.score -
        a.compatibility.score
    );

    res.status(200).json({
      success: true,
      count: results.length,
      matches: results,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};