-- CreateTable
CREATE TABLE "UserNotification" (
    "id" TEXT NOT NULL,
    "notificationText" TEXT,
    "notificationClip" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
