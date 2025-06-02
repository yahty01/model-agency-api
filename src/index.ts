import express from 'express';
import dotenv from 'dotenv';
import modelsRouter from './routes/models';
import type { Request, Response } from 'express';


dotenv.config();

const app = express();
app.use(express.json()); // ✅ для POST
const port = process.env.PORT || 3001;

app.use('/models', modelsRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});