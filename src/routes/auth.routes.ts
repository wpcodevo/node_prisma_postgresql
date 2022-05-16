import express from 'express';
import {
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
} from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

<<<<<<< HEAD
=======
router.get('/refresh', refreshAccessTokenHandler);

>>>>>>> jwt_auth_verify_email
router.get(
  '/verifyemail/:verificationCode',
  validate(verifyEmailSchema),
  verifyEmailHandler
);

<<<<<<< HEAD
=======
router.get('/logout', deserializeUser, requireUser, logoutUserHandler);

>>>>>>> jwt_auth_verify_email
export default router;
