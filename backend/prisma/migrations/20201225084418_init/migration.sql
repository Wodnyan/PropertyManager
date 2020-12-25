/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Owner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Owner.propertyId_unique";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "propertyId";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY("ownerId")REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
