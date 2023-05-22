import express from 'express';
import controller from '../controllers/harvest';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createHarvest);
router.get('/:id', extractJWT,controller.getHarvestById)
router.put('/:id',controller.updateHarvest)
router.get('/',extractJWT, controller.getAllHarvests);

export = router;
