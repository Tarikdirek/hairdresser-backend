import Stylist from "../models/Stylist.js";

// Add a new stylist
export const create = async (req, res) => {
  try {
    const { name, bio, specialties, workingHours } = req.body;
    const stylist = new Stylist({ name, bio, specialties, workingHours });
    await stylist.save();
    res.status(201).json(stylist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Edit a stylist
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const stylist = await Stylist.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!stylist) return res.status(404).json({ message: "Stylist not found" });
    res.json(stylist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all stylists
export const getAll = async (req, res) => {
  try {
    const stylists = await Stylist.find();
    res.json(stylists);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
