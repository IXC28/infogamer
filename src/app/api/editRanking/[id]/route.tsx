import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// PATCH: Agregar (update) un juego al ranking
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    const body = await request.json();
    const { category } = body;

    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    // Validar que la categoría es una de las permitidas
    const validCategories = [
      "populares",
      "lanzamientosRecientes",
      "mejorValorados",
      "recomendaciones",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Obtenemos el ranking (se asume que solo existe uno con id = 1)
    const ranking = await db.ranking.findUnique({
      where: { id: 1 },
    });
    if (!ranking) {
      return NextResponse.json({ error: "Ranking not found" }, { status: 404 });
    }

    // Verificar si el juego ya está agregado
    if (ranking[category].includes(gameId)) {
      return NextResponse.json(
        { message: "Game already exists in ranking" },
        { status: 200 }
      );
    }

    // Actualizamos: agregamos el gameId al array de la categoría indicada
    const updatedRanking = await db.ranking.update({
      where: { id: 1 },
      data: {
        [category]: { push: gameId },
      },
    });

    return NextResponse.json({
      message: "Game added successfully",
      ranking: updatedRanking,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating ranking" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un juego del ranking
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Validar que la categoría es válida
    const validCategories = [
      "populares",
      "lanzamientosRecientes",
      "mejorValorados",
      "recomendaciones",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Obtenemos el ranking
    const ranking = await db.ranking.findUnique({
      where: { id: 1 },
    });
    if (!ranking) {
      return NextResponse.json(
        { error: "Ranking not found" },
        { status: 404 }
      );
    }

    // Filtrar el array para remover el gameId
    const updatedArray = ranking[category].filter(
      (id: number) => id !== gameId
    );

    // Actualizamos el ranking con el array modificado
    const updatedRanking = await db.ranking.update({
      where: { id: 1 },
      data: {
        [category]: updatedArray,
      },
    });

    return NextResponse.json({
      message: "Game removed successfully",
      ranking: updatedRanking,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting game from ranking" },
      { status: 500 }
    );
  }
}