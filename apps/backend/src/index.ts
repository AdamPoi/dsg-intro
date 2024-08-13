import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import authRoute from './routes/auth.route';

const app = new Hono().basePath('/api');
app.use(cors());
app.use(secureHeaders());
app.use(logger());
app.use(prettyJSON());

app.route('/auth', authRoute);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.notFound((c) => {
  c.status(404);
  return c.json({
    message: '404 Not Found',
  });
});

app.onError((err, c) => {
  console.error(`${err}`);
  c.status = c.status || 500;
  err.message = err.message || 'Internal Server Error';
  return c.json({
    message: err.message,
  });
});

const port = parseInt(process.env.APP_PORT || '3000', 10);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
