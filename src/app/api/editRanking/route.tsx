import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    // Obtenemos el registro de Ranking (se asume que solo existe uno con id = 1)
    const ranking = await db.ranking.findUnique({
      where: { id: 1 },
    });
    if (!ranking) {
      return NextResponse.json({ message: "Ranking not found" }, { status: 404 });
    }

    // Parseamos el parámetro de búsqueda y lo limpiamos
    const url = new URL(request.url);
    const rawSearch = url.searchParams.get("search") || "";
    const searchQuery = rawSearch.trim();

    // Helper para obtener los juegos ya seleccionados (según los IDs del ranking)
    const getSelectedGames = async (ids: number[]) =>
      await db.games.findMany({
        where: { id: { in: ids } },
        select: { id: true, tittle: true, img: true },
      });

    // Obtenemos los juegos seleccionados para cada categoría
    const [
      selPopulares,
      selLanzamientos,
      selMejorValorados,
      selRecomendaciones,
    ] = await Promise.all([
      getSelectedGames(ranking.populares),
      getSelectedGames(ranking.lanzamientosRecientes),
      getSelectedGames(ranking.mejorValorados),
      getSelectedGames(ranking.recomendaciones),
    ]);

    // Realizamos la búsqueda global solamente si se proporcionó término de búsqueda
    let searchResults: { id: number; tittle: string; img: string }[] = [];
    if (searchQuery) {
      searchResults = await db.games.findMany({
        where: { tittle: { contains: searchQuery, mode: "insensitive" } },
        select: { id: true, tittle: true, img: true },
      });
    }

    // Función para mapear "tittle" a "title"
    const mapGame = (game: { id: number; tittle: string; img: string }) => ({
      id: game.id,
      title: game.tittle,
      img: game.img,
    });

    return NextResponse.json({
      populares: {
        ids: ranking.populares,
        selected: selPopulares.map(mapGame),
        search: searchResults.map(mapGame),
      },
      lanzamientosRecientes: {
        ids: ranking.lanzamientosRecientes,
        selected: selLanzamientos.map(mapGame),
        search: searchResults.map(mapGame),
      },
      mejorValorados: {
        ids: ranking.mejorValorados,
        selected: selMejorValorados.map(mapGame),
        search: searchResults.map(mapGame),
      },
      recomendaciones: {
        ids: ranking.recomendaciones,
        selected: selRecomendaciones.map(mapGame),
        search: searchResults.map(mapGame),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving edit ranking data" },
      { status: 500 }
    );
  }
}