const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {

    console.log("New Ambulance Request");

    res.json({
        success: true,
        message: "Ambulance request submitted successfully."
    });

});

module.exports = router;
