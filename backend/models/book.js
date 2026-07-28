const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentType: {
      type: String,
      required: true,
      enum: ["Hospital Visit", "Video Consultation"],
    },
    slot: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
