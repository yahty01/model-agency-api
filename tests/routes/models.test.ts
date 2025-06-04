import request from 'supertest';
import {prisma} from "../../src/db/client";
import app from "../../src";

beforeAll(async () => {
  await prisma.model.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /models', () => {
  it('должен вернуть пустой массив моделей', async () => {
    const res = await request(app).get('/models');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('POST /models', () => {
  it('должен создать модель', async () => {
    const model = {
      name: 'Alice',
      age: 22,
      height: 178,
      city: 'Paris',
      inTown: true,
      photoUrl: 'https://example.com/photo.jpg'
    };

    const res = await request(app).post('/models').send(model);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(model.name);
    expect(res.body.inTown).toBe(true);
  });
});

describe('POST /models с ошибками', () => {
  it('должен вернуть 500 при пустом теле', async () => {
    const res = await request(app).post('/models').send({});
    expect(res.statusCode).toBe(500); // пока нет валидации
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /models/in-town', () => {
  it('должен вернуть только модели, которые находятся в городе', async () => {
    const res = await request(app).get('/models/in-town');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    for (const model of res.body.data) {
      expect(model.inTown).toBe(true);
    }
  });
});

describe('GET /models с пагинацией', () => {
  beforeAll(async () => {
    await prisma.model.deleteMany();
    const models = Array.from({ length: 5 }).map((_, i) => ({
      name: `Model ${i + 1}`,
      age: 20 + i,
      height: 170 + i,
      city: 'City',
      inTown: true,
      photoUrl: `https://example.com/photo${i + 1}.jpg`,
    }));
    await prisma.model.createMany({ data: models });
  });

  it('должен вернуть 2 элемента на первой странице', async () => {
    const res = await request(app).get('/models?page=1&pageSize=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.pageSize).toBe(2);
    expect(res.body.data.length).toBe(2);
  });

  it('должен вернуть оставшиеся на последней странице', async () => {
    const res = await request(app).get('/models?page=3&pageSize=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.pagination.page).toBe(3);
    expect(res.body.data.length).toBe(1); // 5 элементов → 2 + 2 + 1
  });
});