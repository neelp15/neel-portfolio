const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email is too long"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [150, "Subject cannot exceed 150 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);