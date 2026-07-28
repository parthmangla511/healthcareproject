const express = require("express");
const {
  getAllPharmacies,
  getPharmacyById,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
} = require("../controllers/pharmacyController");

const router = express.Router();

router.get("/pharmacies", getAllPharmacies);
router.get("/pharmacies/:id", getPharmacyById);
router.post("/pharmacies", createPharmacy);
router.put("/pharmacies/:id", updatePharmacy);
router.delete("/pharmacies/:id", deletePharmacy);

module.exports = router;
