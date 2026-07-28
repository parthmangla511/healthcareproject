const Contact = require("../models/contact");
const { broadcastNotification } = require("../utils/notifications");

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

    const notificationMessage = `Hi ${name}, we received your message and will contact you soon at ${email}.`;

    broadcastNotification({
      type: "contact",
      title: "New contact request",
      message: notificationMessage,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      notification: notificationMessage,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
