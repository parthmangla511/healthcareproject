const express = require("express");
const router = express.Router();
const { createLabTest, getLabTests } = require("../controllers/labTestController");

router.post("/lab-tests", createLabTest);
router.get("/lab-tests", getLabTests);

module.exports = router;
