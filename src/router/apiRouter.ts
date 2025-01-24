import {Router} from 'express';
import apiController from '../controller/apiController';
import rateLimit from '../middleware/rateLimit';

const router = Router();

router.route('/self').get(apiController.self)
router.route('/health').get(rateLimit,apiController.health)

export default router;