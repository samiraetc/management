-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "estimative" INTEGER NOT NULL,
    "creator_id" TEXT NOT NULL,
    "task_number" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "url_key" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskAssigneds" (
    "user_id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "TaskAssigneds_pkey" PRIMARY KEY ("user_id","task_id")
);

-- CreateTable
CREATE TABLE "TaskLabels" (
    "team_label_id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "TaskLabels_pkey" PRIMARY KEY ("team_label_id","task_id")
);

-- CreateTable
CREATE TABLE "TeamTasks" (
    "team_id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "TeamTasks_pkey" PRIMARY KEY ("team_id","task_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_id_key" ON "Tasks"("id");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssigneds" ADD CONSTRAINT "TaskAssigneds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssigneds" ADD CONSTRAINT "TaskAssigneds_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLabels" ADD CONSTRAINT "TaskLabels_team_label_id_fkey" FOREIGN KEY ("team_label_id") REFERENCES "TeamLabels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLabels" ADD CONSTRAINT "TaskLabels_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTasks" ADD CONSTRAINT "TeamTasks_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTasks" ADD CONSTRAINT "TeamTasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
