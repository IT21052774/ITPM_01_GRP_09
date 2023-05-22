import express from 'express';
import controller from '../controllers/order';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createOrder);
router.get('/:id', extractJWT,controller.getOrderById)
router.put('/:id',controller.updateOrder)
router.get('/',extractJWT, controller.getAllOrders);

export = router;
