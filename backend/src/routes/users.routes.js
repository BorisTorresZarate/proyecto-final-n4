import express from 'express';
import { register, login, getUserData } from '../controllers/users.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', verifyToken, getUserData); 

export default router;
