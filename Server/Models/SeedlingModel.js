// models/Seedling.js (backend)
import mongoose from "mongoose";


const seedlingSchema =mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Productive seedlings', 'Non-productive seedlings'], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SeedlingModel =mongoose.model("seedlings",seedlingSchema);
export default SeedlingModel;