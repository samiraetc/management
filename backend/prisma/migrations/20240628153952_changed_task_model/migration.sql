/*
  Warnings:

  - Changed the type of `task_number` on the `Tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "task_number",
ADD COLUMN     "task_number" INTEGER NOT NULL;
