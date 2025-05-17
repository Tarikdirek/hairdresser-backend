const mongoose = require("mongoose");

const stylistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    specialties: [{ type: String }], // e.g., ['men', 'coloring']
    workingHours: {
      type: Object, // e.g., { monday: ['09:00-17:00'], tuesday: ['10:00-18:00'] }
      default: {},
    },
    gallery: [{ type: String }], // Array of image file paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stylist", stylistSchema);
