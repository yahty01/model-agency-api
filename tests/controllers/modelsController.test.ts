import { Request, Response } from 'express';
import {createModel, getAllModels} from '../../src/controllers/modelsController';
import {prisma} from "../../src/db/client";


describe('modelsController.createModel', () => {
  it('должен вызвать prisma.model.create с данными', async () => {
    const mockCreate = jest.spyOn(prisma.model, 'create').mockResolvedValueOnce({
      id: 'test-id',
      name: 'SpyModel',
      age: 23,
      height: 170,
      city: 'TestCity',
      inTown: true,
      photoUrl: 'url',
      createdAt: new Date(),
    });

    const req = {
      body: {
        name: 'SpyModel',
        age: 23,
        height: 170,
        city: 'TestCity',
        inTown: true,
        photoUrl: 'url',
      }
    } as Request;

    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const res = { status, json } as unknown as Response;

    await createModel(req, res);

    expect(mockCreate).toHaveBeenCalledWith({
      data: req.body,
    });
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ name: 'SpyModel' }));

    mockCreate.mockRestore();
  });
});

describe('modelsController.getAllModels', () => {
  it('должен вызвать res.json без ошибок', async () => {
    const req = {
      query: {
        page: '1',
        pageSize: '10'
      }
    } as unknown as Request;

    const json = jest.fn();
    const res = { json } as unknown as Response;

    await getAllModels(req, res);
    expect(json).toHaveBeenCalled();
  });
});


describe('modelsController.createModel', () => {
  it('должен вызвать prisma.model.create с данными', async () => {
    const mockCreate = jest.spyOn(prisma.model, 'create').mockResolvedValueOnce({
      id: 'test-id',
      name: 'SpyModel',
      age: 23,
      height: 170,
      city: 'TestCity',
      inTown: true,
      photoUrl: 'url',
      createdAt: new Date(),
    });

    const req = {
      body: {
        name: 'SpyModel',
        age: 23,
        height: 170,
        city: 'TestCity',
        inTown: true,
        photoUrl: 'url',
      },
    } as Request;

    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const res = { status, json } as unknown as Response;

    await createModel(req, res);

    expect(mockCreate).toHaveBeenCalledWith({
      data: req.body,
    });
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ name: 'SpyModel' }));

    mockCreate.mockRestore();
  });
});