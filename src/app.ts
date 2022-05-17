require('dotenv').config();
import express, { Response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import redisClient from './utils/connectRedis';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  // Testing
  app.get('/api/healthchecker', async (_, res: Response) => {
    const message = await redisClient.get('try');
    res.status(200).json({
      status: 'success',
      message,
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
