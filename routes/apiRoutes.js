const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");
const serviceController = require("../controllers/serviceController");
const stylistController = require("../controllers/stylistController");
const galleryController = require("../controllers/galleryController");
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Appointment routes
router.post("/appointments/book", auth, appointmentController.book);
router.post("/appointments/cancel/:id", auth, appointmentController.cancel);

// Service routes
router.post("/services", auth, serviceController.create);
router.get("/services", serviceController.getAll);
router.put("/services/:id", auth, serviceController.update);
router.delete("/services/:id", auth, serviceController.delete);

// Stylist routes
router.post("/stylists", auth, stylistController.create);
router.get("/stylists", stylistController.getAll);
router.put("/stylists/:id", auth, stylistController.update);

// Gallery upload route
router.post(
  "/gallery/upload",
  auth,
  upload.single("image"),
  galleryController.upload
);

module.exports = router;
