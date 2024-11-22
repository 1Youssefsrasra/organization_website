const MessageContact = require("../models/MessageContact");
const { compileAndSendEmail } = require("../utils/sendEmail");

const sanitizeHtml = require("sanitize-html");

exports.addMessageContact = async (req, res) => {
  try {
    const { error } = MessageContact.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { fullname, email, text } = req.body;

    const sanitizedText = sanitizeHtml(text);

    compileAndSendEmail(fullname, email, sanitizedText);
    const newMessageContact = new MessageContact({
      fullname,
      email,
      text: sanitizedText,
    });
    await newMessageContact.save();

    res.status(201).json({
      success: true,
      message: "MessageContact Added successfully",
      messageContact: newMessageContact,
    });
  } catch (error) {
    console.error("Error adding message contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMessagesContact = async (req, res) => {
  try {
    const messagesContact = await MessageContact.find();
    res.json(messagesContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteMessageContact = async (req, res) => {
  try {
    const messageContact = await MessageContact.findOneAndDelete({
      _id: req.params.id,
    });

    if (!messageContact) {
      return res
        .status(404)
        .json({ success: false, message: "MessageContact not found" });
    }

    res.status(200).json({
      success: true,
      message: "MessageContact deleted successfully",
      messageContact,
    });
  } catch (error) {
    console.error("Error deleting MessageContact:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
