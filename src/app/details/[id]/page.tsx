"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

interface GameDetails {
  id: number;
  tittle: string;
  img: string;
  description: string;
  gallery: string[];
  links: string[];
}

export default function GameDetailsPage() {
  const { id } = useParams() as { id: string };
  const [game, setGame] = useState<GameDetails | null>(null);
  const [displayImage, setDisplayImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el icono de la plataforma según el link
  const getPlatformIcon = (link: string) => {
    if (link.includes("store.steampowered.com")) return "/steam.svg";
    if (link.includes("epicgames.com")) return "/epic-games.svg";
    if (link.includes("xbox.com")) return "/xbox.svg";
    if (link.includes("playstation.com")) return "/playstation.svg";
    if (link.includes("nintendo.com")) return "/nintendo.svg";
    if (link.includes("play.google.com")) return "/playstore.svg";

    return "/globe.svg";
  };

  // Función para obtener la etiqueta de la plataforma
  const getPlatformLabel = (link: string) => {
    if (link.includes("store.steampowered.com")) return "Steam";
    if (link.includes("epicgames.com")) return "Epic Games";
    if (link.includes("xbox.com")) return "Xbox";
    if (link.includes("playstation.com")) return "PlayStation";
    if (link.includes("nintendo.com")) return "Nintendo";
    if (link.includes("play.google.com")) return "Playstore";
    return "Otro";
  };

  useEffect(() => {
    if (!id) return;
    fetch(`/api/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los detalles del juego");
        return res.json();
      })
      .then((data) => {
        setGame(data);
        setDisplayImage(data.img);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-8 text-white">Cargando...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (!game) return <p className="text-center mt-8 text-white">Juego no encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-black rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            {game.tittle}
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sección de imagen principal */}
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                <img
                  src={displayImage}
                  alt={game.tittle}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            {/* Sección de descripción, galería y links */}
            <div className="md:w-1/2 p-4">
              <div className="mb-6 max-h-64 overflow-y-auto">
                <p className="text-gray-300 text-base leading-relaxed break-words whitespace-pre-line">
                  {game.description}
                </p>
              </div>
              {game.gallery && game.gallery.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-3">Galería</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {game.gallery.map((url, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-700 rounded overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                        onMouseEnter={() => setDisplayImage(url)}
                        onMouseLeave={() => setDisplayImage(game.img)}
                      >
                        <img
                          src={url}
                          alt={`Galería ${idx + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {game.links && game.links.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-3">Links Oficiales</h2>
                  <div className="flex flex-wrap gap-3">
                    {game.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <img 
                          src={getPlatformIcon(link)} 
                          alt={getPlatformLabel(link)} 
                          className="w-6 h-6"
                        />
                        <span>{getPlatformLabel(link)}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
