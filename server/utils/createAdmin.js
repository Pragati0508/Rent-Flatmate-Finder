
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createDefaultAdmin = async () => {
  try {
    const admin = await User.findOne({
      email: "admin@roommateai.com",
    });

    if (admin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullName: "System Admin",
      email: "admin@roommateai.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Default Admin Created");
    console.log("Email: admin@roommateai.com");
    console.log("Password: Admin@123");

  } catch (err) {
    console.log(err);
  }
};

export default createDefaultAdmin;