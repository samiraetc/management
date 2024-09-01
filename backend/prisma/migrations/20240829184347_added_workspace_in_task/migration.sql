/*
  Warnings:

  - Added the required column `workspace_id` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "workspace_id" TEXT NOT NULL;
