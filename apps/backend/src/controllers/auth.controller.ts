import { Context } from 'hono';
import { registerDTO } from '../dto/auth.dto';
import prisma from '../prisma/client';
import { HTTPException } from 'hono/http-exception';

export default {
  register: async (c: Context) => {
    const body: registerDTO = await c.req.json();
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json(
        {
          message: 'Email already exists',
        },
        400
      );
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return c.json(
      {
        message: 'Register success',
        data: user,
      },
      200
    );
  },
};
