
const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Save the message to MongoDB first.
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    let emailSent = false;

    // Send an email notification after the message is saved.
    try {
      await transporter.sendMail({
        from: `"Neel Portfolio" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: contact.email,
        subject: `New portfolio message: ${contact.subject}`,
        text: [
          "You have received a new message through your portfolio.",
          "",
          `Name: ${contact.name}`,
          `Email: ${contact.email}`,
          `Subject: ${contact.subject}`,
          "",
          "Message:",
          contact.message,
          "",
          `Received at: ${contact.createdAt.toISOString()}`,
        ].join("\n"),
      });

      emailSent = true;
      console.log("Contact notification email sent successfully.");
    } catch (emailError) {
      // The message is already saved, so don't discard it.
      console.error(
        "Email notification failed:",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully!",
      notificationSent: emailSent,
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please check your details and try again.",
      });
    }

    console.error("Contact submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save your message. Please try again later.",
    });
  }
});

module.exports = router;
