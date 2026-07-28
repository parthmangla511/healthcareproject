const Service = require("../models/service");

const seedServiceData = async () => {
  const count = await Service.countDocuments();

  if (count > 0) return;

  const services = [
    {
      title: "Doctor Appointment Booking and Details",
      category: "doctor",
      description:
        "Book appointments with qualified healthcare professionals quickly and conveniently through MediSync. Patients can browse available doctors by specialty, view their schedules, and select a preferred date and time. The system sends instant booking confirmations and appointment reminders, helping reduce missed visits and making healthcare more accessible.",
      doctors: [
        { name: "Dr. Asha Sharma", profession: "Cardiologist", experience: 12 },
        { name: "Dr. Rahul Verma", profession: "Orthopedic Surgeon", experience: 10 },
        { name: "Dr. Nisha Patel", profession: "Pediatrician", experience: 8 },
      ],
    },
    {
      title: "Pharmacy",
      category: "pharmacy",
      description:
        "The Pharmacy Management module in MediSync simplifies the process of managing medicines, prescriptions, and inventory. Patients can easily view prescribed medicines, while pharmacists can efficiently dispense medications, monitor stock levels, and maintain accurate records. This ensures timely medicine availability, reduces errors, and improves overall healthcare services.",
      doctors: [],
    },
    {
      title: "Lab Testing Booking",
      category: "lab-test",
      description:
        "The Lab Testing Booking module in MediSync allows patients to schedule diagnostic tests quickly and conveniently. Patients can choose from a wide range of laboratory tests, select their preferred date and time, and receive booking confirmations instantly. The system also enables doctors to review test results digitally, ensuring faster diagnosis and better patient care.",
      doctors: [],
    },
    {
      title: "Ambulance Booking",
      category: "ambulance",
      description:
        "Need immediate medical assistance? Our 24/7 ambulance service ensures rapid response, GPS-enabled tracking, trained paramedics, and safe transportation to the nearest healthcare facility. Book an ambulance instantly during medical emergencies with just one click. Fast, reliable, and fully equipped ambulances available 24/7 for emergency medical transportation. Our experienced medical staff ensure timely care and safe hospital transfers.",
      doctors: [],
    },
    {
      title: "Nearest Hospital and service",
      category: "hospital",
      description:
        "Find nearby hospitals and clinics easily with location-based search. Get details about healthcare centers, available doctors, emergency services, timings, and contact information.",
      doctors: [],
    },
    {
      title: "Vaccination Service",
      category: "vaccination",
      description:
        "Get easy access to vaccination services with MediSync. Find available vaccines, nearby vaccination centers, schedule appointments, and maintain your vaccination records digitally.",
      doctors: [],
    },
  ];

  await Service.insertMany(services);
};

const getAllServices = async (req, res) => {
  try {
    await seedServiceData();
    const services = await Service.find().sort({ createdAt: -1 });
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDoctorBookingService = async (req, res) => {
  try {
    await seedServiceData();
    const service = await Service.findOne({ category: "doctor" }).lean();

    if (!service) {
      return res.status(404).json({ message: "Doctor booking service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServiceByCategory = async (req, res) => {
  try {
    await seedServiceData();
    const service = await Service.findOne({ category: req.params.category }).lean();

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllServices,
  getDoctorBookingService,
  getServiceByCategory,
};