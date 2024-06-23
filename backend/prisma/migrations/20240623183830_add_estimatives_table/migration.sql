-- CreateTable
CREATE TABLE "Estimatives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" TEXT[],

    CONSTRAINT "Estimatives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estimatives_id_key" ON "Estimatives"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Estimatives_name_key" ON "Estimatives"("name");
