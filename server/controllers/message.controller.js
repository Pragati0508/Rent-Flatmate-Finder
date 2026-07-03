import mongoose from "mongoose";
import Message from "../models/Message.js";
import Interest from "../models/Interest.js";

/*
=========================================
Send Message
=========================================
*/

export const sendMessage = async (req, res) => {
  try {
    const { receiver, listingId, message } = req.body;

    if (!receiver || !listingId || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(receiver) ||
      !mongoose.Types.ObjectId.isValid(listingId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs",
      });
    }

    // Only allow chat after interest is accepted
    const interest = await Interest.findOne({
      listing: listingId,
      status: "accepted",
      $or: [
        {
          tenant: req.user._id,
          owner: receiver,
        },
        {
          tenant: receiver,
          owner: req.user._id,
        },
      ],
    });

    if (!interest) {
      return res.status(403).json({
        success: false,
        message: "Chat is only available after owner accepts the request.",
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      listing: listingId,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: newMessage,
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
Get Chat History
=========================================
*/

export const getMessages = async (req, res) => {
  try {

    const { userId, listingId } = req.params;

    const messages = await Message.find({
      listing: listingId,

      $or: [
        {
          sender: req.user._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    })
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};