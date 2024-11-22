const Demande = require("../models/Demande");

exports.addDemande = async (req, res) => {
  try {
    const demande = new Demande(req.body);
    await demande.save();
    res.status(201).json({ success: true, data: demande });
  } catch (err) {
    console.error("Error adding demande:", err);
    res.status(500).json({ success: false, error: "Error adding demande" });
  }
};

exports.getALLDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.json({ success: true, data: demandes });
  } catch (err) {
    console.error("Error fetching demandes:", err);
    res.status(500).json({ success: false, error: "Error fetching demandes" });
  }
};

exports.deleteDemande = async (req, res) => {
  try {
    const demande = await Demande.findOneAndDelete({ _id: req.params.id });

    if (!demande) {
      return res
        .status(404)
        .json({ success: false, message: "Demande not found" });
    }

    res.status(200).json({
      success: true,
      message: "Demande deleted successfully",
      demande,
    });
  } catch (error) {
    console.error("Error deleting Demande:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
