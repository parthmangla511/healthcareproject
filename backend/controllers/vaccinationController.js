const Vaccination = require("../models/vaccination");

const vaccination = async (req, res) => {
  try {
    const { name, age, address, email, contact_number } = req.body;
    if (!name || !age || !address || !email || !contact_number) {
      return res.status(400).json({
        message: "Please provide all required vaccination booking details.",
      });
    }

    const booking = new Vaccination({
      name,
      age,
      address,
      email,
      contact_number,
    });

    await booking.save();

    return res.status(201).json({
      message: "Vaccination booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getVaccinationBookings = async (req, res) => {
  try {
    const bookings = await Vaccination.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getVaccinationBookingById = async (req, res) => {
  try {
    const booking = await Vaccination.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateVaccinationBooking = async (req, res) => {
  try {
    const booking = await Vaccination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVaccinationBooking = async (req, res) => {
  try {
    const booking = await Vaccination.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  vaccination,
  getVaccinationBookings,
  getVaccinationBookingById,
  updateVaccinationBooking,
  deleteVaccinationBooking,
};
