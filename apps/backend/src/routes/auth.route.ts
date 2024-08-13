import { Hono } from 'hono';
import authController from '../controllers/auth.controller';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const authRoute = new Hono();

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
authRoute.post(
  '/register',
  zValidator('json', userSchema, (result, c) => {
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

export default authRoute;
