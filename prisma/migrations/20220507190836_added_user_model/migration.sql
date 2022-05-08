-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT E'uuid()',
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT E'default.png',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationCode" TEXT,
    "password" TEXT NOT NULL,
    "passwordConfirm" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT E'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_verificationCode_idx" ON "users"("verificationCode");
