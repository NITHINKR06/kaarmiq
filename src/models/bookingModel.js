const mongoose = require("mongoose");

// Define the booking schema
const bookingSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    employeeUsername: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    empEmail: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      default: ''
    },
    selectedDate: {
      type: String, // Store date as a string (e.g., "2025-01-02")
      required: true,
    },
    bookingTime: {
      type: String, // Store time as a string (e.g., "14:00")
      required: true,
    },
    reasonOfCancel: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the Booking model
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;
