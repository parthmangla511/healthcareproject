const mongoose = require("mongoose");

const nearestSchema = new mongoose.Schema(
  {
    city:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    }
  }
);

module.exports = mongoose.model("Nearest", nearestSchema);