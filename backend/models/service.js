const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  experience: { type: Number, required: true },
});

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    doctors: [doctorSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
