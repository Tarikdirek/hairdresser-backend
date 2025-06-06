import Appointment from "../models/Appointment.js";
import Stylist from "../models/Stylist.js";

// Book an appointment
export const book = async (req, res) => {
  try {
    const { stylist, service, date, time, user } = req.body;
    // Check if stylist is available at the given date and time
    const existing = await Appointment.findOne({
      stylist,
      date,
      time,
      status: "booked",
    });
    if (existing) {
      return res.status(400).json({ message: "Time slot not available" });
    }
    const appointment = new Appointment({ user, stylist, service, date, time });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel an appointment
export const cancel = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
