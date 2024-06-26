/*
  Warnings:

  - The primary key for the `WorkspaceLabels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `label_id` on the `WorkspaceLabels` table. All the data in the column will be lost.
  - You are about to drop the `WorkspaceCustomLabels` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `WorkspaceLabels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workspace_id,name]` on the table `WorkspaceLabels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `can_edit` to the `WorkspaceLabels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `WorkspaceLabels` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `WorkspaceLabels` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `WorkspaceLabels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkspaceCustomLabels" DROP CONSTRAINT "WorkspaceCustomLabels_workspace_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceLabels" DROP CONSTRAINT "WorkspaceLabels_label_id_fkey";

-- AlterTable
ALTER TABLE "WorkspaceLabels" DROP CONSTRAINT "WorkspaceLabels_pkey",
DROP COLUMN "label_id",
ADD COLUMN     "can_edit" BOOLEAN NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "WorkspaceLabels_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "WorkspaceCustomLabels";

-- CreateTable
CREATE TABLE "WorkspaceTeams" (
    "team_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "WorkspaceTeams_pkey" PRIMARY KEY ("team_id","workspace_id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "estimates_type" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "members_count" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembers" (
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "TeamMembers_pkey" PRIMARY KEY ("user_id","team_id")
);

-- CreateTable
CREATE TABLE "TeamLabels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "can_edit" BOOLEAN NOT NULL,

    CONSTRAINT "TeamLabels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_workspace_id_name_key" ON "Team"("workspace_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamLabels_id_key" ON "TeamLabels"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamLabels_team_id_name_key" ON "TeamLabels"("team_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceLabels_id_key" ON "WorkspaceLabels"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceLabels_workspace_id_name_key" ON "WorkspaceLabels"("workspace_id", "name");

-- AddForeignKey
ALTER TABLE "WorkspaceTeams" ADD CONSTRAINT "WorkspaceTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceTeams" ADD CONSTRAINT "WorkspaceTeams_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD CONSTRAINT "TeamMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD CONSTRAINT "TeamMembers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLabels" ADD CONSTRAINT "TeamLabels_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
