const Partner = require("../models/Partner");

exports.addPartner = async (req, res) => {
  try {
    const { name, logo } = req.body;

    const newPartner = new Partner({
      name,
      logo,
    });

    await newPartner.save();
    res.status(201).json({
      success: true,
      message: "Partner Added successfully",
      partner: newPartner,
    });
  } catch (error) {
    console.error("Error saving Partner:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findOneAndDelete({ _id: req.params.id });

    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
      partner,
    });
  } catch (error) {
    console.error("Error deleting Partner:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
