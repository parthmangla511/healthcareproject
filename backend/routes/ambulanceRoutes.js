const express = require("express");
const router = express.Router();

const { ambulance } = require("../controllers/ambulanceController");

router.post("/ambulance", ambulance);

module.exports = router;