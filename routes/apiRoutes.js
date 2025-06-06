import express from "express";
import { book, cancel } from "../controllers/appointmentController.js";
import {
  create as createService,
  getAll as getAllServices,
  update as updateService,
  deleteService,
} from "../controllers/serviceController.js";
import {
  create as createStylist,
  update as updateStylist,
  getAll as getAllStylists,
} from "../controllers/stylistController.js";
import { upload } from "../controllers/galleryController.js";
import multer from "multer";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadMiddleware = multer({ storage });

/**
 * @swagger
 * tags:
 *   - name: Appointment
 *     description: Appointment management
 *   - name: Service
 *     description: Service management
 *   - name: Stylist
 *     description: Stylist management
 *   - name: Gallery
 *     description: Gallery image upload
 */

/**
 * @swagger
 * /appointments/book:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               stylist:
 *                 type: string
 *                 description: Stylist ID
 *               service:
 *                 type: string
 *                 description: Service ID
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 example: "14:00"
 *     responses:
 *       201:
 *         description: Appointment booked
 *       400:
 *         description: Time slot not available
 */
router.post("/appointments/book", book);

/**
 * @swagger
 * /appointments/cancel/{id}:
 *   post:
 *     summary: Cancel an appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment cancelled
 *       404:
 *         description: Appointment not found
 */
router.post("/appointments/cancel/:id", cancel);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *                 description: Duration in minutes
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service created
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of services
 */
router.post("/services", createService);
router.get("/services", getAllServices);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Service not found
 *   delete:
 *     summary: Delete a service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Service not found
 */
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

/**
 * @swagger
 * /stylists:
 *   post:
 *     summary: Add a new stylist
 *     tags: [Stylist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *               workingHours:
 *                 type: object
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       201:
 *         description: Stylist created
 *   get:
 *     summary: Get all stylists
 *     tags: [Stylist]
 *     responses:
 *       200:
 *         description: List of stylists
 */
router.post("/stylists", createStylist);
router.get("/stylists", getAllStylists);

/**
 * @swagger
 * /stylists/{id}:
 *   put:
 *     summary: Edit a stylist
 *     tags: [Stylist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Stylist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *               workingHours:
 *                 type: object
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       200:
 *         description: Stylist updated
 *       404:
 *         description: Stylist not found
 */
router.put("/stylists/:id", updateStylist);

/**
 * @swagger
 * /gallery/upload:
 *   post:
 *     summary: Upload an image to stylist's gallery
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               stylistId:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded
 *       400:
 *         description: No file uploaded
 *       404:
 *         description: Stylist not found
 */
router.post("/gallery/upload", uploadMiddleware.single("image"), upload);

export default router;
