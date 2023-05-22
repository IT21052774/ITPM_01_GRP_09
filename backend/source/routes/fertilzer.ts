import express from 'express';
import controller from '../controllers/fertilzer';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createFertlizer);
router.get('/:id', extractJWT,controller.getFertlizerById)
router.put('/:id',controller.updateFertlizer)
router.get('/',extractJWT, controller.getAllFertlizers);

export = router;
