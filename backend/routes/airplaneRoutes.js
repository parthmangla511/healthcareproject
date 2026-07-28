const express = require("express");
const router = express.Router();

const { airplane } = require("../controllers/airplaneController");

router.post("/airplane", airplane);

module.exports = router;