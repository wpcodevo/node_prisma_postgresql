require('dotenv').config();
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.routes';
import AppError from './utils/appError';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  // MIDDLEWARE
  app.use(express.json({ limit: '10kb' }));

  // ROUTES
  app.use('/api/auth', authRouter);

  // UNHANDLED ROUTES
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
