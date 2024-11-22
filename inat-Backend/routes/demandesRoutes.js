const express = require("express");
const router = express.Router();
const demandesController = require("../controllers/demandesController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.post("/add", demandesController.addDemande);

router.get("/all", requireAdminAuth, demandesController.getALLDemandes);

router.delete(
  "/delete/:id",
  requireAdminAuth,
  demandesController.deleteDemande
);

module.exports = router;
