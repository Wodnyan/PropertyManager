-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
"id" SERIAL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
"id" SERIAL,
    "landlordId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Property.ownerId_unique" ON "Property"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant.landlordId_unique" ON "Tenant"("landlordId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant.propertyId_unique" ON "Tenant"("propertyId");

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY("ownerId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("landlordId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD FOREIGN KEY("propertyId")REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
