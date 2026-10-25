
const express = require("express");
const { Resend } = require("resend");
const Contact = require("../models/Contact");

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send the notification through Resend's HTTPS API.
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured.");
      }

      if (!process.env.CONTACT_RECEIVER) {
        throw new Error("CONTACT_RECEIVER is not configured.");
      }

      const { data, error } = await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "Neel Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_RECEIVER],
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

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.id) {
        throw new Error("Resend did not return an email ID.");
      }

      emailSent = true;
      console.log("Contact notification accepted by Resend:", data.id);
    } catch (emailError) {
      // The message is already saved, so don't discard it.
      console.error("Email notification failed:", emailError.message);
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
