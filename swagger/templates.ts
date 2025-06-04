import { z } from 'zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  totalItems: z.number()
}).openapi('PaginationMeta');

export const paginatedResponse = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: paginationSchema
  });

export const registerPaginatedGet = (
  registry: OpenAPIRegistry,
  path: string,
  summary: string,
  schema: z.ZodTypeAny
) => {
  registry.registerPath({
    method: 'get',
    path,
    summary,
    responses: {
      200: {
        description: 'Успешный ответ со списком',
        content: {
          'application/json': {
            schema: paginatedResponse(schema)
          }
        }
      }
    }
  });
};