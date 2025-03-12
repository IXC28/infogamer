import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, img, description, gallery, links, tags, devices, platforms } = await request.json();
    // Nota: Se mapea "title" a "tittle" según tu schema de Prisma.
    const newGame = await db.games.create({
      data: {
        tittle: title,
        img,
        description,
        gallery,
        links,
        tags,       // nuevo
        devices,    // nuevo
        platforms,  // nuevo
      },
    });
    return NextResponse.json(newGame, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}