/*
  Warnings:

  - You are about to drop the column `verificationCode` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_verificationCode_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "verificationCode";
