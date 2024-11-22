// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const requireAdminAuth = require("../middlewares/authMiddleware");

router.get("/get", eventController.getEvent);

router.post("/add", requireAdminAuth, eventController.updateEvent);

module.exports = router;
