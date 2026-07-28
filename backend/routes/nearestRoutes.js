const express = require("express");
const router = express.Router();

const { nearest } = require("../controllers/nearestController");

router.post("/nearest", nearest);

module.exports = router;