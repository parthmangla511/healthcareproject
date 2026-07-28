const Contact = require("../models/contact");

exports.contactUs = async (req, res) => {
  try {
    const { name, email, phone_number, message } = req.body;

    if (!name || !email || !phone_number || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone_number,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};