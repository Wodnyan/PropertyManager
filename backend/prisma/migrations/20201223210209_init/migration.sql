/*
  Warnings:

  - Made the column `ownerId` on table `Property` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "ownerId" SET NOT NULL;
