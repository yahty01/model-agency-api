import { Request, Response } from 'express';
import { prisma } from '../db/client';

const fetchModels = async (
  req: Request,
  res: Response,
  whereClause?: Record<string, any>
) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const [models, total] = await Promise.all([
      prisma.model.findMany({
        skip,
        take: pageSize,
        where: whereClause,
      }),
      prisma.model.count({
        where: whereClause,
      }),
    ]);

    res.json({
      data: models,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
};

// ✅ GET /models — без фильтрации
export const getAllModels = async (req: Request, res: Response) => {
  return fetchModels(req, res);
};

// ✅ GET /models/in-town — inTown = true
export const getInTownModels = async (req: Request, res: Response) => {
  return fetchModels(req, res, { inTown: true });
};

// ✅ POST /models
export const createModel = async (req: Request, res: Response) => {
  const data = req.body;
  const newModel = await prisma.model.create({ data });
  res.status(201).json(newModel);
};