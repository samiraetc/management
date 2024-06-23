/*
  Warnings:

  - Added the required column `permission` to the `WorkspaceMembers` table without a default value. This is not possible if the table is not empty.

*/


-- migration.sql

ALTER TABLE "WorkspaceMembers" ADD COLUMN "permission" TEXT;

UPDATE "WorkspaceMembers" SET "permission" = 'member' WHERE "permission" IS NULL;

ALTER TABLE "WorkspaceMembers" ADD CONSTRAINT "permission_check" CHECK ("permission" IN ('admin', 'member', 'management'));
