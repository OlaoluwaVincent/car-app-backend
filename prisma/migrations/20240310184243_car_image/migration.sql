/*
  Warnings:

  - You are about to drop the column `image_url` on the `CarImage` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `CarImage` table. All the data in the column will be lost.
  - Added the required column `images` to the `CarImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarImage" DROP COLUMN "image_url",
DROP COLUMN "public_id",
ADD COLUMN     "images" JSONB NOT NULL;
