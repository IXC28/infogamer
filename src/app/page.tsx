"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Definimos interfaces para tipificar los datos
interface Screenshot {
  id: number;
  image: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
  short_screenshots?: Screenshot[];
}

const API_KEY = "2180e28dd6484d1ab05574b1dc53f539";
const BASE_URL = "https://api.rawg.io/api";

// Componente de carrusel para mostrar un juego a la vez
const GameCarousel = ({ games }: { games: Game[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (games.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [games]);

  if (games.length === 0) return null;
  const game = games[index];

  // Obtenemos hasta 4 capturas de pantalla, si están disponibles
  const screenshots = game.short_screenshots ? game.short_screenshots.slice(0, 4) : [];

  return (
    <div className="game-card bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow mx-auto w-full md:w-[70%] overflow-visible">
      <div className="flex flex-col md:flex-row">
        {/* Contenedor para la imagen principal con altura máxima */}
        <div className="w-full md:w-1/2 h-auto max-h-96 overflow-hidden">
          <img 
            src={game.background_image} 
            alt={game.name} 
            className="w-full h-full max-h-96 object-cover transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col justify-between md:w-1/2">
          <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
          {/* Galería de capturas */}
          <div className="grid grid-cols-2 gap-2 my-4">
            {screenshots.map((shot, idx) => (
              <div
                key={shot.id || idx}
                className="relative group overflow-hidden transition-all duration-300 max-h-26 group-hover:max-h-none"
              >
                <img 
                  src={shot.image} 
                  alt={`Screenshot ${idx + 1}`} 
                  className="w-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <a 
            href={`/game/${game.id}`} 
            className="mt-2 text-red-600 hover:underline text-base"
          >
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [relevantGames, setRelevantGames] = useState<Game[]>([]);
  const [newGames, setNewGames] = useState<Game[]>([]);
  const [addedGames, setAddedGames] = useState<Game[]>([]);

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const eightMonthsAgo = new Date();
  eightMonthsAgo.setMonth(today.getMonth() - 8);
  const startDate = eightMonthsAgo.toISOString().split("T")[0]; // Últimos 8 meses
  const endDate = today.toISOString().split("T")[0]; // Hoy

  useEffect(() => {
    // Juegos más relevantes: filtrados por fecha (últimos 8 meses) y ordenados por "added" descendente
    fetch(`${BASE_URL}/games?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-added&page_size=10`)
      .then(res => res.json())
      .then(data => setRelevantGames(data.results))
      .catch(err => console.error("Error fetching relevant games:", err));

    // Juegos más nuevos: filtrados para el año actual y ordenados por fecha de lanzamiento descendente
    fetch(`${BASE_URL}/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-released&page_size=10`)
      .then(res => res.json())
      .then(data => setNewGames(data.results))
      .catch(err => console.error("Error fetching new games:", err));

    // Juegos más jugados: ordenados por "added" descendente (sin filtro de fechas)
    fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=10`)
      .then(res => res.json())
      .then(data => setAddedGames(data.results))
      .catch(err => console.error("Error fetching added games:", err));
  }, [startDate, endDate, currentYear]);

  return (
    <div id="body" className="min-h-screen bg-gray-300 text-black">
      <Navbar />

      <div className="home">
        <header className="hero bg-red-600 py-10 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Bienvenido a la Mejor Plataforma Gamer
          </h1>
          <input 
            type="text" 
            placeholder="Buscar juegos por nombre, género o popularidad..."
            className="search-bar w-full max-w-md p-2 rounded border-2 border-red-600 bg-black text-white placeholder-red-600 focus:outline-none focus:border-red-600"
          />
        </header>

        {/* Juegos más relevantes */}
        <section className="relevant py-8 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-6 text-red-600 drop-shadow-md">
            Juegos más populares actualmente
          </h2>
          <div className="game-grid flex justify-center">
            <GameCarousel games={relevantGames} />
          </div>
        </section>

        {/* Juegos más nuevos */}
        <section className="new py-8 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-6 text-red-600 drop-shadow-md">
            Juegos más nuevos
          </h2>
          <div className="game-grid flex justify-center">
            <GameCarousel games={newGames} />
          </div>
        </section>

        {/* Juegos más jugados */}
        <section className="added py-8 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-6 text-red-600 drop-shadow-md">
            Juegos más jugados
          </h2>
          <div className="game-grid flex justify-center">
            <GameCarousel games={addedGames} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
