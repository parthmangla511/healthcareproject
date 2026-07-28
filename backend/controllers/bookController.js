const Book = require("../models/book");

const createAppointment = async (req, res) => {
  try {
    const { name, appointmentDate, appointmentType, slot } = req.body;

    if (!name || !appointmentDate || !appointmentType || !slot) {
      return res.status(400).json({
        message:
          "Please provide your name, preferred date, appointment type, and slot.",
      });
    }

    const ticketNumber = `TKT-${Date.now().toString().slice(-6)}`;

    const booking = new Book({
      name,
      appointmentDate,
      appointmentType,
      slot,
      ticketNumber,
    });
    await booking.save();

    return res.status(201).json({
      message: `Your ${appointmentType.toLowerCase()} slot has been reserved successfully.`,
      booking,
      ticketNumber,
    });
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
