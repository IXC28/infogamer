export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ accessGranted: true }, { status: 200 });
  } else {
    return NextResponse.json({ accessGranted: false }, { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }
    const { title, img, description, gallery, links, tags, devices, platforms } =
      await request.json();

    const gameId = parseInt(id, 10);
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const updatedGame = await db.games.update({
      where: { id: gameId },
      data: {
        tittle: title,
        img,
        description,
        gallery,
        links,
        tags,
        devices,
        platforms,
      },
    });

    return NextResponse.json(updatedGame, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }
    const gameId = parseInt(id, 10);
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const deletedGame = await db.games.delete({
      where: { id: gameId },
    });

    return NextResponse.json(deletedGame, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}