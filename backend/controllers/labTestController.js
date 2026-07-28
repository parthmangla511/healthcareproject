const LabTest = require("../models/labTest");

const createLabTest = async (req, res) => {
  try {
    const { name, age, testType, appointmentDate, appointmentTime, contactNumber, email } = req.body;

    if (!name || !age || !testType || !appointmentDate || !appointmentTime || !contactNumber || !email) {
      return res.status(400).json({ message: "Please provide all required lab test booking fields." });
    }

    const booking = new LabTest({
      name,
      age,
      testType,
      appointmentDate,
      appointmentTime,
      contactNumber,
      email,
    });

    await booking.save();

    return res.status(201).json({ message: "Lab test booked successfully", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getLabTests = async (req, res) => {
  try {
    const bookings = await LabTest.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLabTest,
  getLabTests,
};
