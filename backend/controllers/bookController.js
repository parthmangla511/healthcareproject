const Book = require("../models/book");

const createAppointment = async (req, res) => {
  try {
    const { name, appointmentDate, appointmentTime } = req.body;

    if (!name || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "Please provide name, date, and time." });
    }

    const booking = new Book({ name, appointmentDate, appointmentTime });
    await booking.save();

    return res.status(201).json({ message: "Appointment booked successfully", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const bookings = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
