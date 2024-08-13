import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

export default {
  jwtAuth: async (c: Context, next: Next) => {
    try {
      const headerToken = c.req.header('Authorization') || '';
      if (!headerToken)
        throw new HTTPException(401, { message: 'No Authorization given' });

      const jwt = headerToken.split(' ')[1];
      if (!jwt) throw new HTTPException(401, { message: 'Use bearer token' });

      const tokenData = await verify(jwt, process.env.SECRET_KEY || 'secret');
      if (!tokenData)
        throw new HTTPException(401, { message: 'Invalid token' });

      c.set('tokenPayload', tokenData);
    } catch (e: any) {
      throw new HTTPException(e.statusCode, { message: e.message, cause: e });
    }
    await next();
  },
};
