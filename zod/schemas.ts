import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z); // ← обязательно один раз

export const ModelInputSchema = z.object({
  name: z.string().openapi({ example: 'Alice' }),
  age: z.number().int().min(10).max(100).openapi({ example: 22 }),
  height: z.number().int().min(100).max(250).openapi({ example: 178 }),
  city: z.string().openapi({ example: 'Paris' }),
  inTown: z.boolean().openapi({ example: true }),
  photoUrl: z.string().url().openapi({ example: 'https://cloudinary.com/photo.jpg' }),
}).openapi('ModelInput');

export const ModelSchema = ModelInputSchema.extend({
  id: z.string().uuid().openapi({ example: 'd1a6e670-d04f-46b5-b542-8a18ba9d44fd' }),
  createdAt: z.string().datetime().openapi({ example: new Date().toISOString() }),
}).openapi('Model');