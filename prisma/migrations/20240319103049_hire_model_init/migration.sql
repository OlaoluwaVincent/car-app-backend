/*
  Warnings:

  - A unique constraint covering the columns `[carHiredId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renterId]` on the table `HiredCar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `renterId` to the `HiredCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "carHiredId" TEXT;

-- AlterTable
ALTER TABLE "HiredCar" ADD COLUMN     "renterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_carHiredId_key" ON "Car"("carHiredId");

-- CreateIndex
CREATE UNIQUE INDEX "HiredCar_renterId_key" ON "HiredCar"("renterId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carHiredId_fkey" FOREIGN KEY ("carHiredId") REFERENCES "HiredCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiredCar" ADD CONSTRAINT "HiredCar_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
