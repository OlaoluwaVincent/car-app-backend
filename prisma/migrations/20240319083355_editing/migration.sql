-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_billingId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "billingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "BilingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
