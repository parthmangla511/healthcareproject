const Airplane = require("../models/airplane");

const airplane = async (req, res) => {
  try {
    const { name, depature_city, destination_city, travel_date, contact_number, email } = req.body;

    if (!name || !depature_city || !destination_city || !travel_date || !contact_number || !email) {
      return res.status(400).json({
        message: "Please provide all required airplane booking details.",
      });
    }

    const booking = new Airplane({
      name,
      depature_city,
      destination_city,
      travel_date,
      contact_number,
      email,
    });

    await booking.save();

    return res.status(201).json({
      message: "Airplane booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAirplaneBookings = async (req, res) => {
  try {
    const bookings = await Airplane.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAirplaneBookingById = async (req, res) => {
  try {
    const booking = await Airplane.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAirplaneBooking = async (req, res) => {
  try {
    const booking = await Airplane.findByIdAndUpdate(
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

const deleteAirplaneBooking = async (req, res) => {
  try {
    const booking = await Airplane.findByIdAndDelete(req.params.id);

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
  airplane,
  getAirplaneBookings,
  getAirplaneBookingById,
  updateAirplaneBooking,
  deleteAirplaneBooking,
};
