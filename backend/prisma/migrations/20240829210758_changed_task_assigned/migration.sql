/*
  Warnings:

  - You are about to drop the `TaskAssigneds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskAssigneds" DROP CONSTRAINT "TaskAssigneds_task_id_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssigneds" DROP CONSTRAINT "TaskAssigneds_user_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "assigned_to" TEXT;

-- DropTable
DROP TABLE "TaskAssigneds";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
