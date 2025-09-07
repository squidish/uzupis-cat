import express from 'express';

export const app = express();
const port = process.env.PORT ?? 3000;

let visits = 0;

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/visits', (_req, res) => {
  visits += 1;
  res.json({ total: visits });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export function resetVisits(): void {
  visits = 0;
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
