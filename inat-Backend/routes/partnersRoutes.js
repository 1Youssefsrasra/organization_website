const express = require("express");
const router = express.Router();
const partnersController = require("../controllers/partnersController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.post("/add", requireAdminAuth, partnersController.addPartner);

router.get("/all", partnersController.getPartners);

router.delete(
  "/delete/:id",
  requireAdminAuth,
  partnersController.deletePartner
);

module.exports = router;
