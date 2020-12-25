/*
  Warnings:

  - You are about to drop the column `userId` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `longitude` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `landlordId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[user_id]` on the table `Owner`. If there are existing duplicate values, the migration will fail.
  - Added the required column `user_id` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Property` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Property` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Property` required. The migration will fail if there are existing NULL values in that column.
  - Added the required column `landlord_id` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Owner_userId_unique";

-- DropIndex
DROP INDEX "Tenant.propertyId_unique";

-- DropIndex
DROP INDEX "Tenant.landlordId_unique";

-- DropIndex
DROP INDEX "Tenant_userId_unique";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_userId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_landlordId_fkey";

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_userId_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "userId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "ownerId",
DROP COLUMN "userId",
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "landlordId",
DROP COLUMN "propertyId",
DROP COLUMN "userId",
ADD COLUMN     "landlord_id" INTEGER NOT NULL,
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_user_id_unique" ON "Owner"("user_id");

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY("user_id")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY("owner_id")REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("landlord_id")REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("property_id")REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
