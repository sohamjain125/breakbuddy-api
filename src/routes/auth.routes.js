import express from 'express';
import { register, login, chefLogin } from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema, chefLoginSchema } from '../validation/auth.js';

const router = express.Router();

// Employee registration
router.post('/register', validate(registerSchema), register);

// Employee login
router.post('/login', validate(loginSchema), login);

// Chef login
router.post('/chef/login', validate(chefLoginSchema), chefLogin);

export default router; 