/*
  Warnings:

  - You are about to drop the column `passwordConfirm` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordConfirm",
ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "verified" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
