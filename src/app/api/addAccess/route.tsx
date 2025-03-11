import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  // Compara la contraseña recibida con la variable de entorno ADMIN_PASSWORD
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ accessGranted: true }, { status: 200 });
  } else {
    return NextResponse.json({ accessGranted: false }, { status: 401 });
  }
}