import { Hono } from 'hono';
import authController from '../controllers/auth.controller';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const authRoute = new Hono();

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
authRoute.post(
  '/register',
  zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: 'Validation error',
          errors: result.error.issues.map((error) => ({
            [error.path]: error.message,
          })),
        },
        400
      );
    }
  }),

  authController.register
);

authRoute.post(
  '/login',
  zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: 'Validation error',
          errors: result.error.issues.map((error) => ({
            [error.path]: error.message,
          })),
        },
        400
      );
    }
  }),

  authController.login
);

export default authRoute;
