-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PROVIDE', 'ADMIN');

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" TEXT NOT NULL,
    "notificationText" TEXT,
    "notificationClip" TEXT,
    "ownerId" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "hashedPassword" TEXT,
    "address" TEXT NOT NULL DEFAULT '',
    "profileImg" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "images" JSONB NOT NULL,
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
    "cancellation" BOOLEAN DEFAULT true,
    "mileage" TEXT,
    "bags" TEXT,
    "extras" JSONB,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CarImage_carImageId_key" ON "CarImage"("carImageId");

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carImageId_fkey" FOREIGN KEY ("carImageId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
