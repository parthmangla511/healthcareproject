const mongoose = require("mongoose");

const airplaneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    depature_city: {
      type: String,
      required: true,
    },
    destination_city: {
      type: String,
      required: true,
    },
    travel_date: {
      type: Date,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["Flight Service", "Medical Escort"],
      default: "Flight Service",
    },
    slot: {
      type: String,
    },
    ticketNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airplane", airplaneSchema);
