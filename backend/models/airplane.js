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
  }
);

module.exports = mongoose.model("Airplane", airplaneSchema);