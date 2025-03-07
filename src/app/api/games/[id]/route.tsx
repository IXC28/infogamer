// app/api/games/[id]/route.tsx
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const gameId = parseInt(id, 10);

  try {
    const game = await db.games.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    return NextResponse.json(game, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
