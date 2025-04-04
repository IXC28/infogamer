"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";

// Updated interface including filters fields
interface Game {
  id: number;
  tittle: string; // en la base de datos es "tittle"
  img: string;
  description: string;
  gallery: string[];
  links: string[];
  tags: string[];
  devices: string[];
  platforms: string[];
}

function ExplorerContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialTags = searchParams?.get("tags") ? searchParams.get("tags")!.split(",") : [];
  const initialDevices = searchParams?.get("devices") ? searchParams.get("devices")!.split(",") : [];
  const initialPlatforms = searchParams?.get("platforms") ? searchParams.get("platforms")!.split(",") : [];

  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tags: initialTags,
    devices: initialDevices,
    platforms: initialPlatforms,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Callback for updating filters from Filter component
  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log("Filtros actualizados en Explorer:", newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        } else {
          console.error("Error al obtener juegos");
        }
      } catch (error) {
        console.error("Error al obtener juegos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.tittle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      filters.tags.length === 0 ||
      (game.tags &&
        filters.tags.some(filterTag =>
          game.tags.some(gtag => gtag.toLowerCase() === filterTag.toLowerCase())
        ));

    const matchesDevices =
      filters.devices.length === 0 ||
      (game.devices &&
        filters.devices.some(filterDevice =>
          game.devices.some(gDevice => gDevice.toLowerCase() === filterDevice.toLowerCase())
        ));

    const matchesPlatforms =
      filters.platforms.length === 0 ||
      (game.platforms &&
        filters.platforms.some(filterPlatform =>
          game.platforms.some(gPlatform => gPlatform.toLowerCase() === filterPlatform.toLowerCase())
        ));

    return matchesSearch && matchesTags && matchesDevices && matchesPlatforms;
  });

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const currentGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Search bar and filter toggle */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
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

          {/* Paginated game list */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-white">Cargando...</p>
            ) : currentGames.length > 0 ? (
              currentGames.map(game => (
                <a
                  key={game.id}
                  className="flex items-center bg-black rounded p-4 hover:bg-gray-800 transition-colors"
                  href={`/details/${game.id}`}
                >
                  <img
                    src={game.img}
                    alt={game.tittle}
                    className="w-16 h-16 rounded mr-4 object-cover"
                  />
                  <h3 className="text-white text-xl">{game.tittle}</h3>
                </a>
              ))
            ) : (
              <p className="text-white">No se encontraron juegos.</p>
            )}
          </div>

          {/* Pagination controls */}
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
      </div>
      <Footer />
    </div>
  );
}

export default function Explorer() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ExplorerContent />
    </Suspense>
  );
}
