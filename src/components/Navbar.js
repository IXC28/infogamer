import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#1C3166] via-[#240047] to-[#1C0021] border-b border-[#00A9D4]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-[#40FFDC] text-2xl font-bold">
              InfoGamer
            </a>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <a
                href="/"
                className="text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/explorer"
                className="text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
              >
                Explorador de Juegos
              </a>
            </li>
            <li>
              <a
                href="/ranking"
                className="text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
              >
                Ranking
              </a>
            </li>
            <li>
              <a
                href="/downloads"
                className="text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
              >
                Descargas
              </a>
            </li>
            <li>
              <a
                href="/community"
                className="text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
              >
                Comunidad
              </a>
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#00A9D4] hover:text-[#40FFDC] focus:outline-none"
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
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href="/"
                  className="block text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/explorer"
                  className="block text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
                >
                  Explorador de Juegos
                </a>
              </li>
              <li>
                <a
                  href="/ranking"
                  className="block text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
                >
                  Ranking
                </a>
              </li>
              <li>
                <a
                  href="/downloads"
                  className="block text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
                >
                  Descargas
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="block text-[#00A9D4] px-3 py-2 rounded transition-colors hover:text-[#40FFDC]"
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
