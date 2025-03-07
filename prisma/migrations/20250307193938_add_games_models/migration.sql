-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "tittle" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '/maintenance.svg',
    "description" TEXT NOT NULL,
    "gallery" TEXT[],

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_tittle_key" ON "Games"("tittle");
