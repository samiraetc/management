/*
  Warnings:

  - You are about to drop the column `members_count` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "members_count",
ALTER COLUMN "estimates_type" DROP NOT NULL;
