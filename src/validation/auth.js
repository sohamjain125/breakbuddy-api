import { z } from 'zod';

// Employee registration validation
const registerSchema = z.object({
  fullName: z.string().min(1),
  employeeId: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

// Employee login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Chef login validation
const chefLoginSchema = z.object({
  chefId: z.string().min(1),
  password: z.string().min(6),
});

export {
  registerSchema,
  loginSchema,
  chefLoginSchema,
}; 