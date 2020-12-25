/*
  Warnings:

  - You are about to alter the column `latitude` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `longitude` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(65,30);
