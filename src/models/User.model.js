import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'employee' },
  profile: {
    phone: String,
    department: String,
    // Add more editable fields as needed
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema); 