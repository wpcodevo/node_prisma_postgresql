import express from 'express';
import {
  loginUserHandler,
  registerUserHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import {
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
} from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

router.get(
  '/verifyemail/:verificationCode',
  validate(verifyEmailSchema),
  verifyEmailHandler
);

export default router;
