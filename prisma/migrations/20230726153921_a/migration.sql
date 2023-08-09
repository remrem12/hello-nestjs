/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "updatedTime" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedTime" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
