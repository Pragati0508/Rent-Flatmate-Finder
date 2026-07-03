import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    rent: {
      type: Number,
      required: true,
      min: 0,
    },

    availableFrom: {
      type: Date,
      required: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Shared"],
      required: true,
    },

    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: true,
    },

    photos: [
      {
        type: String,
      },
    ],

    isFilled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Listing", listingSchema);