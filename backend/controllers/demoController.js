const DemoBooking = require("../models/demo");

const bookDemo = async (req, res) => {
  try {
    const { name, email, phone, hospital, service, city, state, agree } = req.body;
    if (!name || !email || !phone || !hospital || !service || !city || !state || agree !== true) {
      return res.status(400).json({
        message: "Please provide all required demo booking details and consent.",
      });
    }

    const booking = new DemoBooking({
      name,
      email,
      phone,
      hospital,
      service,
      city,
      state,
      agree,
    });

    await booking.save();

    const notificationMessage = `Thank you ${name}! Your demo request has been received. We will contact you at ${email} soon.`;

    return res.status(201).json({
      success: true,
      message: "Demo booked successfully",
      notification: notificationMessage,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getDemoBookings = async (req, res) => {
  try {
    const bookings = await DemoBooking.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getDemoBookingById = async (req, res) => {
  try {
    const booking = await DemoBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDemoBooking = async (req, res) => {
  try {
    const booking = await DemoBooking.findByIdAndUpdate(
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

const deleteDemoBooking = async (req, res) => {
  try {
    const booking = await DemoBooking.findByIdAndDelete(req.params.id);

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
  bookDemo,
  getDemoBookings,
  getDemoBookingById,
  updateDemoBooking,
  deleteDemoBooking,
};
