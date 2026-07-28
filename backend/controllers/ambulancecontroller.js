const Ambulance = require("../models/ambulance");

const ambulance = async (req, res) => {
  try {
    const { name, age, pickup_location, drop_location, contact_number, email } = req.body;

    if (!name || !age || !pickup_location || !drop_location || !contact_number || !email) {
      return res.status(400).json({
        message: "Please provide all required ambulance booking details.",
      });
    }

    const booking = new Ambulance({
      name,
      age,
      pickup_location,
      drop_location,
      contact_number,
      email,
    });

    await booking.save();

    return res.status(201).json({
      message: "Ambulance booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAmbulanceBookings = async (req, res) => {
  try {
    const bookings = await Ambulance.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAmbulanceBookingById = async (req, res) => {
  try {
    const booking = await Ambulance.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAmbulanceBooking = async (req, res) => {
  try {
    const booking = await Ambulance.findByIdAndUpdate(
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

const deleteAmbulanceBooking = async (req, res) => {
  try {
    const booking = await Ambulance.findByIdAndDelete(req.params.id);

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
  ambulance,
  getAmbulanceBookings,
  getAmbulanceBookingById,
  updateAmbulanceBooking,
  deleteAmbulanceBooking,
};
