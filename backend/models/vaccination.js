const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    appointmentType: {
      type: String,
      enum: ["Center Visit", "Home Visit"],
      default: "Center Visit",
    },
    slot: {
      type: String,
    },
    ticketNumber: {
      type: String,
      unique: true,
    },
  }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
