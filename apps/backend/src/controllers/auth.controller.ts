import { Context } from 'hono';
import { registerDTO } from '../dto/auth.dto';
import prisma from '../prisma/client';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';

export default {
  login: async (c: Context) => {
    const body: registerDTO = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new HTTPException(404, { message: 'User not found' });
    }
    const bcrypt = require('bcrypt');
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      throw new HTTPException(401, { message: 'Invalid email and password' });
    }
    const secret: string = process.env.SECRET_KEY || '';
    const token = await sign(user, secret);

    return c.json(
      {
        message: 'Login success',
        data: { ...user, token: token },
      },
      200
    );
  },

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
