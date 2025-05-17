const Stylist = require("../models/Stylist");

// Upload image to stylist's gallery
exports.upload = async (req, res) => {
  try {
    const { stylistId, category } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    const stylist = await Stylist.findById(stylistId);
    if (!stylist) return res.status(404).json({ message: "Stylist not found" });
    // Save image path and category
    stylist.gallery.push(file.path);
    await stylist.save();
    res.status(201).json({ message: "Image uploaded", path: file.path });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
