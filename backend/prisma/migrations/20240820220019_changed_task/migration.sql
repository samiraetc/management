/*
  Warnings:

  - You are about to drop the column `status_id` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `task_number` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `identifier` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "status_id",
DROP COLUMN "task_number",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "identifier" TEXT NOT NULL,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "priority" SET DATA TYPE TEXT,
ALTER COLUMN "estimative" SET DATA TYPE TEXT;
