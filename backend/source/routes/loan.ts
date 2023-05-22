import express from 'express';
import controller from '../controllers/loan';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createLoan);
router.get('/:id', extractJWT,controller.getLoanById)
router.put('/:id',controller.updateLoan)
router.get('/',extractJWT, controller.getAllLoans);

export = router;
