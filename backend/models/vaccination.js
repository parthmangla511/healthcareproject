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
  }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);