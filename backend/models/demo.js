const mongoose = require("mongoose");

const demoBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    agree: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
);

module.exports = mongoose.model("DemoBooking", demoBookingSchema);
