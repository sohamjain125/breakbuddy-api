import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Chef from '../models/Chef.model.js';

// Generate JWT Token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Employee registration
export const register = async (req, res) => {
  try {
    const { fullName, employeeId, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { employeeId }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or employee ID already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      fullName,
      employeeId,
      email,
      password: hashedPassword,
      role: 'employee'
    });

    await user.save();

    // Generate token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Employee login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Chef login
export const chefLogin = async (req, res) => {
  try {
    const { chefId, password } = req.body;

    // Find chef by chefId
    const chef = await Chef.findOne({ chefId });
    if (!chef) {
      return res.status(401).json({ error: 'Invalid chef ID or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, chef.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid chef ID or password' });
    }

    // Generate token
    const token = generateToken({
      id: chef._id,
      chefId: chef.chefId,
      role: chef.role
    });

    res.json({
      message: 'Chef login successful',
      token,
      chef: {
        id: chef._id,
        name: chef.name,
        chefId: chef.chefId,
        role: chef.role
      }
    });

  } catch (error) {
    console.error('Chef login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 