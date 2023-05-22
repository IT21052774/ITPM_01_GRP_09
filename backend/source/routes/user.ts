import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/:id', extractJWT,controller.getUserById)
router.put('/:id',controller.updateUser)
router.get('/get/all',extractJWT, controller.getAllUsers);

export = router;
