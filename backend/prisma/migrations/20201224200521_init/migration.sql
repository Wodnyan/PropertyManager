/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `Tenant`. If there are existing duplicate values, the migration will fail.
  - Added the required column `userId` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_landlordId_fkey";

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Owner" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner.propertyId_unique" ON "Owner"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_unique" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_userId_unique" ON "Tenant"("userId");

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY("propertyId")REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("landlordId")REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
