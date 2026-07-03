import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(cloudinary.config());

try {
  const result = await cloudinary.api.ping();
  console.log("Cloudinary Connected!");
  console.log(result);
} catch (err) {
  console.log(err);
}