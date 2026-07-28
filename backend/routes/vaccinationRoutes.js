const express = require("express");
const router = express.Router();

const { vaccination } = require("../controllers/vaccinationController");

router.post("/vaccinations", vaccination);

module.exports = router;