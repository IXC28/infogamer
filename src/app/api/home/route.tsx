import { NextResponse } from "next/server";

export async function GET() {
  // Accedemos a la API_KEY_RAWG definida en el archivo .env
  const apiKey = process.env.API_KEY_RAWG;

  if (!apiKey) {
    return NextResponse.json({ error: "API Key no encontrada" }, { status: 500 });
  }
  
  // Puedes hacer algo con la API Key, por ejemplo, retornarla o usarla para una petición externa.
  return NextResponse.json({ apiKey });
}