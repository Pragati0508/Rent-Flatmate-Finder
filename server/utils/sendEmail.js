import { createTransporter } from "../config/mail.js";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();

    console.log("================================");
    console.log("📧 Sending Email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("================================");

    const info = await transporter.sendMail({
      from: `"RoomMate AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Sending Failed");
    console.error(error);
    throw error;
  }
};

export default sendEmail;