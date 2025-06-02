import { Router } from 'express';
import {
  getAllModels,
  getInTownModels,
  createModel
} from '../controllers/modelsController';

const router = Router();

router.get('/', getAllModels);
router.get('/in-town', getInTownModels);
router.post('/', createModel);

export default router;