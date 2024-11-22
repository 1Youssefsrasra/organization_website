const express = require("express");
const router = express.Router();
const chiffresController = require("../controllers/chiffresController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.post("/add", requireAdminAuth, chiffresController.addChiffres);

router.get("/all", chiffresController.getChiffres);

router.delete(
  "/delete/:id",
  requireAdminAuth,
  chiffresController.deleteChiffres
);

router.put("/update/:id", requireAdminAuth, chiffresController.updateChiffres);

module.exports = router;
