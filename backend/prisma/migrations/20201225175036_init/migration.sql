/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[user_id]` on the table `Tenant`. If there are existing duplicate values, the migration will fail.
  - Added the required column `user_id` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_user_id_unique" ON "Tenant"("user_id");

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("user_id")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
