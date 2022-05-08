import express from 'express';
import {
  loginUserHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

export default router;
