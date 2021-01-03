-- CreateTable
CREATE TABLE "Invite" (
"id" SERIAL,
    "code" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite.code_unique" ON "Invite"("code");

-- AddForeignKey
ALTER TABLE "Invite" ADD FOREIGN KEY("property_id")REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
