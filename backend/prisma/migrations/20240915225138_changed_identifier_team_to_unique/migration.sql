/*
  Warnings:

  - A unique constraint covering the columns `[identifier,workspace_id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_identifier_workspace_id_key" ON "Team"("identifier", "workspace_id");
