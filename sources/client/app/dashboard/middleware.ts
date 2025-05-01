import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si connecté, continuer vers la page demandée
  return NextResponse.next();
}
