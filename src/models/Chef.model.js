import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chefId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'chef' },
}, { timestamps: true });

export default mongoose.model('Chef', chefSchema); 