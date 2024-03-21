/*
  Warnings:

  - A unique constraint covering the columns `[billingId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "discount" TEXT DEFAULT '',
ADD COLUMN     "freeDriver" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "billingId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "BilingAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "BilingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HiredCar" (
    "id" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "dropoffAddress" TEXT NOT NULL,
    "extras" JSONB,
    "payNowPrice" TEXT NOT NULL,
    "payLaterPrice" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "userCancelled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HiredCar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_billingId_key" ON "User"("billingId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "BilingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
