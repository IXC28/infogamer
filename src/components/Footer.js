import React from 'react';
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-red-600 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sección superior: 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sección 1 */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-red-600">InfoGamer</h3>
            <p>
              InfoGamer es la plataforma ideal para los amantes de los videojuegos. Aquí encontrarás
              información rápida y accesible sobre los títulos más conocidos, además de reseñas, recomendaciones,
              sitios de descarga, tutoriales para mejorar tu experiencia de juego y mucho más.
            </p>
          </div>
          {/* Sección 2 */}
          <div className="md:text-right">
            <h3 className="text-lg font-bold mb-2 text-red-600">Comunidad</h3>
            <div className="flex space-x-4 justify-end">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.75V12h2.75V9.79c0-2.73 1.63-4.23 4.12-4.23 1.19 0 2.44.21 2.44.21v2.69h-1.38c-1.36 0-1.79.85-1.79 1.73V12h3.04l-.49 2.88h-2.55v6.99A10 10 0 0022 12z"/>
                </svg>
              </a>
              {/* Discord */}
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full">
                <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.86-.608 1.245-2.005-.3-3.993-.3-6 0-.164-.384-.405-.87-.616-1.245a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C2.523 9.045 1.67 13.579 2.007 18.057a.082.082 0 00.031.054 19.9 19.9 0 005.993 3.034.077.077 0 00.084-.027c.461-.63.872-1.295 1.226-1.994a.076.076 0 00-.041-.105 13.117 13.117 0 01-1.872-.897.077.077 0 01-.008-.127c.125-.094.25-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.009c.122.1.247.198.372.292a.077.077 0 01-.007.127 12.993 12.993 0 01-1.873.898.076.076 0 00-.04.106c.36.699.77 1.364 1.226 1.994a.077.077 0 00.084.028 19.902 19.902 0 005.994-3.034.077.077 0 00.03-.054c.38-5.177-.838-9.67-3.548-13.66a.061.061 0 00-.031-.028zM9.545 15.568c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm5.911 0c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Logos */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-bold mb-4 text-white">Plataformas Principales</h3>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <a href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer">
              <Image src="/steam.svg" alt="Steam" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.epicgames.com" target="_blank" rel="noopener noreferrer">
              <Image src="/epic-games.svg" alt="Epic Games" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.unrealengine.com" target="_blank" rel="noopener noreferrer">
              <Image src="/unreal.svg" alt="Unreal Engine" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.playstation.com" target="_blank" rel="noopener noreferrer">
              <Image src="/playstation.svg" alt="PlayStation" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.nintendo.com" target="_blank" rel="noopener noreferrer">
              <Image src="/nintendo.svg" alt="Nintendo" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.xbox.com" target="_blank" rel="noopener noreferrer">
              <Image src="/xbox.svg" alt="Xbox" width={40} height={40} className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
