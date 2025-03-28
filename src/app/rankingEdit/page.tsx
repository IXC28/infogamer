"use client";

import React, { useState, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Game {
  id: number;
  title: string;
  img: string;
}

interface RankingSectionEditProps {
  title: string;
}

const RankingSectionEdit: React.FC<RankingSectionEditProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  // Mapear el título de la sección a la propiedad del response y el nombre de la categoría
  const categoryKeyMap: Record<string, string> = {
    "Populares": "populares",
    "Lanzamientos recientes": "lanzamientosRecientes",
    "Mejor valorados": "mejorValorados",
    "Recomendaciones": "recomendaciones",
  };

  // Función para cargar datos (seleccionados o resultados de búsqueda)
  const fetchData = async (query: string) => {
    try {
      const response = await fetch(
        `/api/editRanking?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      const key = categoryKeyMap[title];
      // Si se realiza búsqueda, actualizamos los resultados de búsqueda
      if (query) {
        const results: Game[] = data[key]?.search || [];
        console.log("Resultados de búsqueda:", results);
        setSearchResults(results);
      } else {
        // Si query está vacío, usamos la propiedad "selected" para llenar inicialmente los seleccionados
        const preselected: Game[] = data[key]?.selected || [];
        setSelectedGames(preselected);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Cargar inicialmente la información de la categoría (juegos seleccionados)
  useEffect(() => {
    fetchData("");
  }, [title]);

  const handleSearch = async () => {
    await fetchData(searchQuery);
  };

  // Función para agregar un juego al ranking a través del endpoint PATCH
  const addGameToRanking = async (game: Game) => {
    try {
      const response = await fetch(`/api/editRanking/${game.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: categoryKeyMap[title] }),
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedGames((prev) => [...prev, game]);
      } else {
        console.error("Error al agregar juego:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error al agregar juego:", error);
    }
  };

  // Función para remover un juego del ranking a través del endpoint DELETE
  const removeGameFromRanking = async (gameId: number) => {
    try {
      const response = await fetch(
        `/api/editRanking/${gameId}?category=${categoryKeyMap[title]}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        setSelectedGames((prev) => prev.filter((g) => g.id !== gameId));
      } else {
        console.error("Error al eliminar juego:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  const handleSelectGame = (game: Game) => {
    if (selectedGames.find((g) => g.id === game.id)) return;
    if (selectedGames.length >= 10) return;
    // Llamamos al endpoint PATCH para agregar el juego
    addGameToRanking(game);
  };

  const handleRemoveGame = (gameId: number) => {
    // Llamamos al endpoint DELETE para remover el juego
    removeGameFromRanking(gameId);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-red-600">{title}</h2>
      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar juegos..."
          className="p-2 rounded border border-gray-700 bg-gray-800 text-white w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Buscar
        </button>
      </div>
      {/* Resultados de búsqueda */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {searchResults.map((game) => (
          <div
            key={game.id}
            className="cursor-pointer bg-black rounded-md p-2 hover:bg-gray-800 transition-colors"
            onClick={() => handleSelectGame(game)}
          >
            <img
              src={game.img}
              alt={game.title}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="text-white text-center text-sm">{game.title}</p>
          </div>
        ))}
        {searchResults.length === 0 && searchQuery !== "" && (
          <p className="col-span-2 sm:col-span-4 text-white">
            No se encontraron juegos.
          </p>
        )}
      </div>
      {/* Juegos seleccionados: organizados en una lista vertical */}
      <div>
        <h3 className="text-xl text-white mb-2">Seleccionados:</h3>
        <ul className="list-disc ml-5 space-y-2">
          {selectedGames.map((game) => (
            <li key={game.id} className="bg-black rounded-md p-2 flex items-center">
              <img
                src={game.img}
                alt={game.title}
                className="w-12 h-12 object-cover rounded mr-2"
              />
              <span className="text-white text-sm flex-grow">{game.title}</span>
              <button
                onClick={() => handleRemoveGame(game.id)}
                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default function RankingEditPage() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-3xl font-bold text-white mb-6">Ranking Edit</h1>
          <RankingSectionEdit title="Populares" />
          <RankingSectionEdit title="Lanzamientos recientes" />
          <RankingSectionEdit title="Mejor valorados" />
          <RankingSectionEdit title="Recomendaciones" />
        </div>
        <Footer />
      </div>
    </PasswordGate>
  );
}