"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filter from "../components/Filter";

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
  const router = useRouter();
  const [relevantGames, setRelevantGames] = useState<Game[]>([]);
  const [newGames, setNewGames] = useState<Game[]>([]);
  const [addedGames, setAddedGames] = useState<Game[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tags: [] as string[],
    devices: [] as string[],
    platforms: [] as string[],
  });
  const [search, setSearch] = useState("");

  // Estado para almacenar el API Key obtenido del backend
  const [apiKey, setApiKey] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const eightMonthsAgo = new Date();
  eightMonthsAgo.setMonth(today.getMonth() - 8);
  const startDate = eightMonthsAgo.toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

  // Callback para recibir los filtros actualizados desde Filter
  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    //console.log("Filtros en Home:", newFilters);
  };

  // Navigation handler for search, including filters as query params
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    queryParams.set("search", search);
    if (filters.tags.length)
      queryParams.set("tags", filters.tags.join(','));
    if (filters.devices.length)
      queryParams.set("devices", filters.devices.join(','));
    if (filters.platforms.length)
      queryParams.set("platforms", filters.platforms.join(','));
    router.push(`/explorer?${queryParams.toString()}`);
  };

  // Fetch the API key from our API route (/api/home)
  useEffect(() => {
    async function fetchApiKey() {
      try {
        const res = await fetch("/api/home");
        if (res.ok) {
          const data = await res.json();
          setApiKey(data.apiKey);
        } else {
          console.error("Error fetching API key");
        }
      } catch (error) {
        console.error("Error fetching API key", error);
      }
    }
    fetchApiKey();
  }, []);

  // Fetch games from RAWG only after obtaining the API key
  useEffect(() => {
    if (!apiKey) return;

    // Juegos más relevantes
    fetch(`${BASE_URL}/games?key=${apiKey}&dates=${startDate},${endDate}&ordering=-added&page_size=10`)
      .then((res) => res.json())
      .then((data) => setRelevantGames(data.results))
      .catch((err) => console.error("Error fetching relevant games:", err));

    // Juegos más nuevos
    fetch(`${BASE_URL}/games?key=${apiKey}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-released&page_size=10`)
      .then((res) => res.json())
      .then((data) => setNewGames(data.results))
      .catch((err) => console.error("Error fetching new games:", err));

    // Juegos más jugados
    fetch(`${BASE_URL}/games?key=${apiKey}&ordering=-added&page_size=10`)
      .then((res) => res.json())
      .then((data) => setAddedGames(data.results))
      .catch((err) => console.error("Error fetching added games:", err));
  }, [apiKey, startDate, endDate, currentYear]);

  useEffect(() => {
    //filters contiene los filtros
    console.log("Filtros actualizados en Home: filters::", filters);
  }, [filters]);

  return (
    <div id="body" className="min-h-screen bg-gradient-to-r from-gray-900 via-red-600 text-black">
      <Navbar />

      <div className="home">
        <header className="hero py-10 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Bienvenido a la Mejor Plataforma Gamer
          </h1>
          <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
            <input 
              type="text" 
              placeholder="Buscar juegos por nombre, género o popularidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-bar w-full max-w-md p-2 rounded border-2 border-red-600 bg-black text-white placeholder-red-300 focus:outline-none focus:border-red-600"
            />
            <button 
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="bg-black text-white border-2 border-red-600 p-2 rounded hover:bg-gray-800 focus:outline-none"
            >
              Filtros
            </button>
          </form>
          {showFilters && <Filter onFiltersChange={updateFilters} />} {/* Aquí llamas a la componente Filter */}
          
          {/* Sección del video de presentación */}
          <section className="video-presentation relative w-4/5 mx-auto h-72 md:h-[500px] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 mt-10">
            <img 
              className="w-full h-full object-cover rounded-2xl" 
              src="/presentacion.gif" 
              alt="Presentación del gaming" 
            />
            <div className="absolute inset-0 opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Contenido adicional, si se requiere */}
            </div>
          </section>
        </header>

        {/* Sección de juegos más relevantes */}
        <section className="relevant py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Juegos más populares actualmente
          </h2>
          <div className="game-grid flex justify-center">
            <GameCarousel games={relevantGames} />
          </div>
        </section>

        {/* Sección de juegos más nuevos */}
        <section className="new py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Juegos más nuevos
          </h2>
          <div className="game-grid flex justify-center">
            <GameCarousel games={newGames} />
          </div>
        </section>

        {/* Sección de juegos más jugados */}
        <section className="added py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">
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
