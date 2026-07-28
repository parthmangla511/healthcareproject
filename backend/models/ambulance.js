const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    pickup_location: {
      type: String,
      required: true,
    },
    drop_location: {
      type: String,
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

module.exports = mongoose.model("Ambulance", ambulanceSchema);