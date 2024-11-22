const Document = require("../models/Document");

exports.addDocument = async (req, res) => {
  try {
    const { label, mandate, description, link } = req.body;

    const newDocument = new Document({
      label,
      mandate,
      description,
      link,
    });

    await newDocument.save();
    res.status(201).json({
      success: true,
      message: "Document Added successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error saving Document:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id });

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      document,
    });
  } catch (error) {
    console.error("Error deleting Document:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
