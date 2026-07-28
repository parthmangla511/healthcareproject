const express = require("express");
const router = express.Router();
const { createAppointment, getAppointments } = require("../controllers/bookController");

router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);

module.exports = router;
