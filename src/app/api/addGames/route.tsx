import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, img, description, gallery, links } = await request.json();
    // Nota: Mapeamos "title" a "tittle" según tu schema de Prisma.
    const newGame = await db.games.create({
      data: {
        tittle: title,
        img,
        description,
        gallery,
        links,
      },
    });
    return NextResponse.json(newGame, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}