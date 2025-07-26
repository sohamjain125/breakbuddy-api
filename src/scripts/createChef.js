import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Chef from '../models/Chef.model.js';
import dotenv from 'dotenv';

dotenv.config();

const createDefaultChef = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/breakbuddy');
    console.log('Connected to MongoDB');

    // Check if chef already exists
    const existingChef = await Chef.findOne({ chefId: 'chef001' });
    if (existingChef) {
      console.log('Default chef already exists');
      process.exit(0);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('chef123', saltRounds);

    // Create default chef
    const chef = new Chef({
      name: 'Master Chef',
      chefId: 'chef001',
      password: hashedPassword,
      role: 'chef'
    });

    await chef.save();
    console.log('Default chef created successfully');
    console.log('Chef ID: chef001');
    console.log('Password: chef123');

  } catch (error) {
    console.error('Error creating default chef:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createDefaultChef(); 