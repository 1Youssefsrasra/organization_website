const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  birthdate: { 
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["homme", "femme", "other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectObjectifs: {
    type: String,
  },
  projectCompetitors: {
    type: String,
  },
  coordinates: {
    type: String,
  },
  features: {
    type: String,
  },
  target: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Demande = mongoose.model("Demande", demandeSchema);

module.exports = Demande;
