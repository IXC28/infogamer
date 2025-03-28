-- CreateTable
CREATE TABLE "Ranking" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "populares" INTEGER[],
    "lanzamientosRecientes" INTEGER[],
    "mejorValorados" INTEGER[],
    "recomendaciones" INTEGER[],

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);
