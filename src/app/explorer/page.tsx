"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";

// Ejemplo de tipo para un juego
interface Game {
  id: number;
  title: string;
  img: string;
}

// Datos de ejemplo para mostrar la lista de juegos
const games: Game[] = [
  { id: 1, title: "Juego Uno", img: "/imgs/game1.jpg" },
  { id: 2, title: "Juego Dos", img: "/imgs/game2.jpg" },
  { id: 3, title: "Juego Tres", img: "/imgs/game3.jpg" },
  { id: 4, title: "Juego Cuatro", img: "/imgs/game4.jpg" },
  { id: 5, title: "Juego Cinco", img: "/imgs/game5.jpg" },
  { id: 6, title: "Juego Seis", img: "/imgs/game6.jpg" },
  { id: 7, title: "Juego Siete", img: "/imgs/game7.jpg" },
  { id: 8, title: "Juego Ocho", img: "/imgs/game8.jpg" },
  { id: 9, title: "Juego Nueve", img: "/imgs/game9.jpg" },
  { id: 10, title: "Juego Diez", img: "/imgs/game10.jpg" },
  { id: 11, title: "Juego Once", img: "/imgs/game11.jpg" },
  { id: 12, title: "Juego Doce", img: "/imgs/game12.jpg" },
  // Agrega más juegos según lo necesites...
];

export default function Explorer() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialTags = searchParams.get("tags") ? searchParams.get("tags")!.split(",") : [];
  const initialDevices = searchParams.get("devices") ? searchParams.get("devices")!.split(",") : [];
  const initialPlatforms = searchParams.get("platforms") ? searchParams.get("platforms")!.split(",") : [];

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tags: initialTags,
    devices: initialDevices,
    platforms: initialPlatforms,
  });

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Callback para actualizar la variable filters
  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log("Filtros actualizados en Explorer:", newFilters);
  };
  
  // Filtra los juegos usando el texto ingresado y aplicando filtros si es necesario
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  
  // Obtener los juegos correspondientes a la página actual
  const currentGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Función para cambiar de página
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    console.log("filtros iniciales", filters);  
    
  }, [])
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="container mx-auto p-4">
        {/* Barra de búsqueda y botón de filtros */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reinicia la página al cambiar búsqueda
            }}
            className="w-full max-w-md p-2 rounded border-2 border-red-600 bg-black text-white placeholder-red-300 focus:outline-none focus:border-red-600"
          />
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className="bg-black text-white border-2 border-red-600 p-2 rounded hover:bg-gray-800 focus:outline-none"
          >
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="mb-4">
            <Filter onFiltersChange={updateFilters} initialFilters={filters} />
          </div>
        )}

        {/* Lista de juegos (paginada) */}
        <div className="space-y-4">
          {currentGames.length > 0 ? (
            currentGames.map(game => (
              <div 
                key={game.id} 
                className="flex items-center bg-black rounded p-4 hover:bg-gray-800 transition-colors"
              >
                <img 
                  src={game.img} 
                  alt={game.title} 
                  className="w-16 h-16 rounded mr-4 object-cover"
                />
                <h3 className="text-white text-xl">{game.title}</h3>
                <a 
                  href={`/details/${game.id}`} 
                  className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Ver Detalles
                </a>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron juegos.</p>
          )}
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-700 text-red-300 hover:bg-gray-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
