import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-black via-red-600 to-black">
      {/* Usamos un contenedor a pantalla completa para que el logo quede al borde */}
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-0">
          {/* Logo sin padding a la izquierda */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-2xl font-bold flex items-center">
              <img
                src="/logo.svg"
                alt="logo"
                className="w-16 h-16 inline-block rounded-b-sm"
              />
              <span className="ml-2">InfoGamer</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 pr-5">
            <li>
              <a
                href="/"
                className="text-white px-3 py-2 rounded transition-colors hover:text-red-500"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/explorer"
                className="text-white px-3 py-2 rounded transition-colors hover:text-red-500"
              >
                Explorador de Juegos
              </a>
            </li>
            <li>
              <a
                href="/ranking"
                className="text-white px-3 py-2 rounded transition-colors hover:text-red-500"
              >
                Ranking
              </a>
            </li>
            <li>
              <a
                href="/downloads"
                className="text-white px-3 py-2 rounded transition-colors hover:text-red-500"
              >
                Descargas
              </a>
            </li>
            <li>
              <a
                href="/community"
                className="text-white px-3 py-2 rounded transition-colors hover:text-red-500"
              >
                Comunidad
              </a>
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <div className="md:hidden pr-5">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-2 pl-5 pr-5 pb-3">
              <li>
                <a
                  href="/"
                  className="block text-white px-3 py-2 rounded transition-colors hover:text-red-500"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/explorer"
                  className="block text-white px-3 py-2 rounded transition-colors hover:text-red-500"
                >
                  Explorador de Juegos
                </a>
              </li>
              <li>
                <a
                  href="/ranking"
                  className="block text-white px-3 py-2 rounded transition-colors hover:text-red-500"
                >
                  Ranking
                </a>
              </li>
              <li>
                <a
                  href="/downloads"
                  className="block text-white px-3 py-2 rounded transition-colors hover:text-red-500"
                >
                  Descargas
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="block text-white px-3 py-2 rounded transition-colors hover:text-red-500"
                >
                  Comunidad
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
