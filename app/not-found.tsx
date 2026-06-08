'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="pt">
      <body className="bg-[#050505] text-white flex flex-col items-center justify-center min-h-screen font-sans">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-[#C6FF4A]">404</h1>
          <h2 className="text-2xl font-semibold">Página não encontrada</h2>
          <p className="text-[#888888] max-w-md">
            O link que você tentou acessar não existe ou a localidade fornecida é inválida.
          </p>
          <Link
            href="/pt"
            className="inline-block px-5 py-2.5 bg-[#C6FF4A] text-black font-bold rounded-lg hover:bg-[#b5eb42] transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </body>
    </html>
  );
}
