import { Parser } from "json2csv";

import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Interest from "../models/Interest.js";

/*
=========================================
Export Users
=========================================
*/

export const exportUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const parser = new Parser();

    const csv = parser.parse(users);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("users.csv");

    return res.send(csv);

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
Export Listings
=========================================
*/

export const exportListings = async (req, res) => {
  try {

    const listings = await Listing.find()
      .populate("owner", "fullName email");

    const parser = new Parser();

    const csv = parser.parse(listings);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("listings.csv");

    return res.send(csv);

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
Export Interests
=========================================
*/

export const exportInterests = async (req, res) => {
  try {

    const interests = await Interest.find()
      .populate("tenant", "fullName email")
      .populate("listing", "title");

    const parser = new Parser();

    const csv = parser.parse(interests);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("interests.csv");

    return res.send(csv);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};