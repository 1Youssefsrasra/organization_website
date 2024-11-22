const Chiffres = require("../models/Chiffres");

exports.addChiffres = async (req, res) => {
  try {
    const {
      projetsLivres,
      collaborateurs,
      EditionForum,
      TauxStatisfaction,
      TauxEmployabilite,
      ActionsRSE,
    } = req.body;

    const newChiffres = new Chiffres({
      projetsLivres,
      collaborateurs,
      EditionForum,
      TauxStatisfaction,
      TauxEmployabilite,
      ActionsRSE,
    });

    await newChiffres.save();
    res.status(201).json({
      success: true,
      message: "Chiffres added successfully",
      Chiffres: newChiffres,
    });
  } catch (error) {
    console.error("Error saving Chiffres:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getChiffres = async (req, res) => {
  try {
    const chiffres = await Chiffres.find(); // Changed variable name to avoid conflict
    res.json(chiffres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteChiffres = async (req, res) => {
  try {
    const chiffres = await Chiffres.findOneAndDelete({ _id: req.params.id }); // Changed variable name to avoid conflict

    if (!chiffres) {
      return res
        .status(404)
        .json({ success: false, message: "Chiffres not found" });
    }

    res.status(200).json({
      success: true,
      message: "Chiffres deleted successfully",
      Chiffres: chiffres,
    });
  } catch (error) {
    console.error("Error deleting Chiffres:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateChiffres = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedChiffres = await Chiffres.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updates against the model schema
    });

    if (!updatedChiffres) {
      return res
        .status(404)
        .json({ success: false, message: "Chiffres not found" });
    }

    res.status(200).json({
      success: true,
      message: "Chiffres updated successfully",
      Chiffres: updatedChiffres,
    });
  } catch (error) {
    console.error("Error updating Chiffres:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
