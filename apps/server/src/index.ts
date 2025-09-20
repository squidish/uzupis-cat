import express from 'express';
import cors from 'cors';


export const app = express();
const port = process.env.PORT ?? 3000;

let visits = 0;
interface Pledge {
  name?: string;
  message: string;
  timestamp: number;
}
const pledges: Pledge[] = [];

/*app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});*/

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable JSON body parsing

/*app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend's origin
  methods: ['GET', 'POST'], // Restrict allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
}));*/

app.get('/api/visits', (_req, res) => {
  visits += 1;
  res.json({ total: visits });
});

app.post('/api/pledge', (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : undefined;
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
  if (message.length === 0 || message.length > 300) {
    res.status(400).json({ error: 'Message must be between 1 and 300 characters' });
    return;
  }
  const entry: Pledge = { name, message, timestamp: Date.now() };
  pledges.push(entry);
  res.json(entry);
});

app.get('/api/pledge', (_req, res) => {
  res.json([...pledges].sort((a, b) => b.timestamp - a.timestamp));
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export function resetVisits(): void {
  visits = 0;
}

export function resetPledges(): void {
  pledges.length = 0;
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
