/*
  Warnings:

  - You are about to drop the `Parameter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Parameter";

-- CreateTable
CREATE TABLE "parameter" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT,
    "description" TEXT,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "parameter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parameter_label_key" ON "parameter"("label");
