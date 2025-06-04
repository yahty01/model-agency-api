import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { ModelSchema, ModelInputSchema } from '../zod/schemas';
import {registerPaginatedGet} from "./templates";

const registry = new OpenAPIRegistry();

registry.register('Model', ModelSchema);
registry.register('ModelInput', ModelInputSchema);

registerPaginatedGet(registry, '/models', 'Получить все модели', ModelSchema);
registerPaginatedGet(registry, '/models/in-town', 'Получить модели в городе', ModelSchema);

registry.registerPath({
  method: 'post',
  path: '/models',
  summary: 'Создать модель',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: ModelInputSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Модель создана',
      content: {
        'application/json': {
          schema: ModelSchema
        }
      }
    },
    500: {
      description: 'Ошибка создания модели'
    }
  }
});

const generator = new OpenApiGeneratorV31(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: '3.1.0',
  info: { title: 'Model Agency API', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3001' }]
});