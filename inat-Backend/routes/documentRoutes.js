const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.post("/add", requireAdminAuth, documentController.addDocument);

router.get("/all", documentController.getDocuments);

router.delete(
  "/delete/:id",
  requireAdminAuth,
  documentController.deleteDocument
);

module.exports = router;
