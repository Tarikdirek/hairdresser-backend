import Service from "../models/Service.js";

// Create a new service
export const create = async (req, res) => {
  try {
    const { name, description, price, duration, category } = req.body;
    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
    });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all services
export const getAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a service
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
