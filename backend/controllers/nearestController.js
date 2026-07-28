const Nearest = require("../models/nearest");

const nearest = async (req, res) => {
  try {
    const { city, service } = req.body;
    if (!city || !service) {
      return res.status(400).json({
        message: "Please provide all required details.",
      });
    }

    const booking = new Nearest({
      city,
      service
    });

    await booking.save();

    return res.status(201).json({
      message: "Details get successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getNearest = async (req, res) => {
  try {
    const bookings = await Nearest.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getNearestById = async (req, res) => {
  try {
    const booking = await Nearest.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Details not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNearest = async (req, res) => {
  try {
    const booking = await Nearest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Details not found" });
    }

    return res.status(200).json({
      message: "Details updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNearest = async (req, res) => {
  try {
    const booking = await Nearest.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Details not found" });
    }

    return res.status(200).json({
      message: "Details deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  nearest,
  getNearest,
  getNearestById,
  updateNearest,
  deleteNearest,
};
