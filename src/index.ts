import express from 'express';
import dotenv from 'dotenv';
import modelsRouter from './routes/models';
import type { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import {openApiDocument} from "../swagger/swagger";

dotenv.config();

const app = express();
app.use(express.json()); // ✅ для POST
const port = process.env.PORT || 3001;

app.use('/models', modelsRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;