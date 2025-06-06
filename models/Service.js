import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
    category: { type: String }, // e.g., 'haircut', 'coloring'
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
