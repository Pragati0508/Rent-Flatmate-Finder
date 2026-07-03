import mongoose from "mongoose";

const compatibilitySchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    explanation: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      enum: ["gemini", "fallback"],
      default: "gemini",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate compatibility records for the same tenant-listing pair
compatibilitySchema.index(
  { tenant: 1, listing: 1 },
  { unique: true }
);

export default mongoose.model(
  "Compatibility",
  compatibilitySchema
);