-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "carImageId" TEXT NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "steering" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "gasoline" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT,
    "tagDescription" TEXT,
    "region" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarImage_carImageId_key" ON "CarImage"("carImageId");

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carImageId_fkey" FOREIGN KEY ("carImageId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
