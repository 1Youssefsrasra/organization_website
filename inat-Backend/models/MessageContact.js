const mongoose = require("mongoose");

const messageContactSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  text: String,
});

module.exports = mongoose.model("MessageContact", messageContactSchema);
