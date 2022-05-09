import { PrismaClient, Prisma } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

export const excludedFields = ['password', 'verified', 'verificationCode'];

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: input,
  });

  return omit(user, excludedFields);
};

export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({
    where,
  });
};

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // 1. Create Session
  redisClient.set(`${user.id}`, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};
