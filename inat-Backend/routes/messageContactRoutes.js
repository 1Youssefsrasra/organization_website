const express = require("express");
const router = express.Router();
const messageContactController = require("../controllers/messageContactController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.post("/add", messageContactController.addMessageContact);

router.get(
  "/all",
  requireAdminAuth,
  messageContactController.getMessagesContact
);

router.delete(
  "/delete/:id",
  requireAdminAuth,
  messageContactController.deleteMessageContact
);

module.exports = router;
