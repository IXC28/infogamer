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

    // Parseamos parámetros de consulta (opcionalmente si se brinda búsqueda)
    const url = new URL(request.url);
    const searchParam = url.searchParams.get("search");

    // Función que arma el filtro de búsqueda si se proporcionó el parámetro "search"
    const buildWhere = (ids: number[]) => ({
      id: { in: ids },
      ...(searchParam && {
        tittle: { contains: searchParam, mode: "insensitive" },
      }),
    });

    // Traemos los juegos para cada categoría según los IDs en el modelo Ranking.
    const [populares, lanzamientosRecientes, mejorValorados, recomendaciones] =
      await Promise.all([
        db.games.findMany({
          where: buildWhere(ranking.populares),
          select: { id: true, tittle: true, img: true, description: true },
        }),
        db.games.findMany({
          where: buildWhere(ranking.lanzamientosRecientes),
          select: { id: true, tittle: true, img: true, description: true },
        }),
        db.games.findMany({
          where: buildWhere(ranking.mejorValorados),
          select: { id: true, tittle: true, img: true, description: true },
        }),
        db.games.findMany({
          where: buildWhere(ranking.recomendaciones),
          select: { id: true, tittle: true, img: true, description: true },
        }),
      ]);

    // Mapeamos para cambiar "tittle" a "title" y dejamos la descripción
    const mapGame = (game: { id: number; tittle: string; img: string; description?: string }) => ({
      id: game.id,
      title: game.tittle,
      img: game.img,
      description: game.description,
    });

    return NextResponse.json({
      populares: populares.map(mapGame),
      lanzamientosRecientes: lanzamientosRecientes.map(mapGame),
      mejorValorados: mejorValorados.map(mapGame),
      recomendaciones: recomendaciones.map(mapGame),
    });
  } catch (error) {
    return NextResponse.json({ error: "Error retrieving ranking data" }, { status: 500 });
  }
}