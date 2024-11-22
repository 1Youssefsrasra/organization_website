const mongoose = require("mongoose");

const ChiffresSchema = new mongoose.Schema({
  projetsLivres: {
    type: Number,
    required: true,
  },
  collaborateurs: {
    type: Number,
    required: true,
  },
  EditionForum: {
    type: Number,
    required: true,
  },
  TauxStatisfaction: {
    type: Number,
    required: true,
  },
  TauxEmployabilite: {
    type: Number,
    required: true,
  },
  ActionsRSE: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Chiffres", ChiffresSchema);
