// controllers/eventController.js

const Event = require("../models/Event");

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findOne();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the event", error });
  }
};

exports.updateEvent = async (req, res) => {
  console.log("Request body:", req.body); // Log incoming request body
  try {
    const { id, title, description, images } = req.body; // Extract id from req.body

    // Try to find the event by ID
    let event = await Event.findById(id);

    if (!event) {
      // If the event does not exist, create a new one
      event = new Event({ title, description, images });
    } else {
      // If the event exists, update it with the provided fields
      event.title = title;
      event.description = description;
      event.images = images;
    }

    // Save the event (either new or updated)
    const savedEvent = await event.save();

    res.status(200).json(savedEvent);
  } catch (error) {
    console.error("Error updating or creating event:", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating or creating the event", error: error.message });
  }
};

