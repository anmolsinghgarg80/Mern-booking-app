import {Router} from 'express';
import {login, logout, signup, validatetoken} from '../controllers/authController';
import verifyToken from '../middlewares/identification';

const router = Router();
router.post('/login', login);
router.post('/register',signup);
router.get('/validate-token', verifyToken, validatetoken);
router.post('/logout', logout);

export {router as authRouter};  // Named export to match the import