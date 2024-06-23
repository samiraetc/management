/*
  Warnings:

  - Made the column `permission` on table `WorkspaceMembers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkspaceMembers" ALTER COLUMN "permission" SET NOT NULL;
