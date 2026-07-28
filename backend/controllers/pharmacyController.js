const Pharmacy = require("../models/pharmacy");

const defaultPharmacies = [
  {
    pharmacyName: "MediSync Pharmacy Central",
    address: "42 City Park, Pitampura, New Delhi-110083",
    phoneNumber: "+91 98765 43210",
    email: "medisync.central@pharmacy.com",
    licenseNumber: "PH/WB/2023/001",
    availability: "Mon-Sun, 8:00 AM - 10:00 PM",
    deliveryAvailable: true,
    medicines: [
      {
        name: "Aspirin",
        dosage: "500mg",
        price: 50,
        quantity: 100,
      },
      {
        name: "Paracetamol",
        dosage: "650mg",
        price: 45,
        quantity: 150,
      },
      {
        name: "Amoxicillin",
        dosage: "500mg",
        price: 120,
        quantity: 80,
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        price: 60,
        quantity: 120,
      },
    ],
  },
  {
    pharmacyName: "Health Plus Pharmacy",
    address: "19 Shubh Enclave, Pashcim Vihar, New Delhi 110033",
    phoneNumber: "+91 98765 43211",
    email: "healthplus@pharmacy.com",
    licenseNumber: "PH/WB/2023/002",
    availability: "Mon-Sun, 7:00 AM - 11:00 PM",
    deliveryAvailable: true,
    medicines: [
      {
        name: "Metformin",
        dosage: "500mg",
        price: 80,
        quantity: 200,
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        price: 150,
        quantity: 100,
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        price: 140,
        quantity: 90,
      },
      {
        name: "Omeprazole",
        dosage: "20mg",
        price: 100,
        quantity: 110,
      },
    ],
  },
  {
    pharmacyName: "Care Pharmacy Network",
    address: "C-1/14, PVR Road, Prashant Vihar, Sector 14, Rohini, Delhi, 110085",
    phoneNumber: "088606 37274",
    email: "care@pharmacy.com",
    licenseNumber: "PH/DL/2023/001",
    availability: "Mon-Sun, 6:00 AM - 12:00 AM",
    deliveryAvailable: true,
    medicines: [
      {
        name: "Cetirizine",
        dosage: "10mg",
        price: 55,
        quantity: 130,
      },
      {
        name: "Salbutamol",
        dosage: "100mcg",
        price: 95,
        quantity: 70,
      },
      {
        name: "Vitamin B Complex",
        dosage: "Syrup",
        price: 120,
        quantity: 50,
      },
      {
        name: "Antibiotic Ointment",
        dosage: "Topical",
        price: 85,
        quantity: 60,
      },
    ],
  },
  {
    pharmacyName: "MediCare Pharmacy",
    address: "Cabin no- 444, AA-299, Shaheed Udham Singh Marg, New Delhi, Delhi, 110088",
    phoneNumber: "084483 39575",
    email: "medicare@pharmacy.com",
    licenseNumber: "PH/DL/2023/002",
    availability: "Mon-Sun, 8:00 AM - 9:00 PM",
    deliveryAvailable: false,
    medicines: [
      {
        name: "Antacid Suspension",
        dosage: "200ml",
        price: 75,
        quantity: 40,
      },
      {
        name: "Cough Syrup",
        dosage: "100ml",
        price: 90,
        quantity: 55,
      },
      {
        name: "Multivitamin Tablets",
        dosage: "Bottle",
        price: 200,
        quantity: 30,
      },
      {
        name: "Pain Relief Gel",
        dosage: "Topical",
        price: 110,
        quantity: 45,
      },
    ],
  },
];

const seedPharmacyData = async () => {
  for (const pharmacy of defaultPharmacies) {
    await Pharmacy.updateOne(
      { pharmacyName: pharmacy.pharmacyName },
      { $set: pharmacy },
      { upsert: true }
    );
  }
};

const getAllPharmacies = async (req, res) => {
  try {
    await seedPharmacyData();
    const pharmacies = await Pharmacy.find().sort({ createdAt: 1 });
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPharmacy = async (req, res) => {
  const pharmacy = new Pharmacy(req.body);
  try {
    const savedPharmacy = await pharmacy.save();
    res.status(201).json(savedPharmacy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePharmacy = async (req, res) => {
  try {
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.status(200).json(updatedPharmacy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePharmacy = async (req, res) => {
  try {
    const deletedPharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!deletedPharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.status(200).json({ message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPharmacies,
  getPharmacyById,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
};
