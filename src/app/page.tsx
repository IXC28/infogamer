"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_KEY = "2180e28dd6484d1ab05574b1dc53f539";
const BASE_URL = "https://api.rawg.io/api";

export default function Home() {
  const [relevantGames, setRelevantGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [addedGames, setAddedGames] = useState([]);
  const currentYear = new Date().getFullYear();
  const today = new Date();
const eightMonthsAgo = new Date();
eightMonthsAgo.setMonth(today.getMonth() - 8);
const startDate = eightMonthsAgo.toISOString().split("T")[0]; // Últimos 8 meses
const endDate = today.toISOString().split("T")[0]; // Hoy
  useEffect(() => {
    // Juegos más relevantes: ordenados por puntuación de Metacritic descendente
    fetch(`${BASE_URL}/games?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-added&page_size=10`)
      .then(res => res.json())
      .then(data => setRelevantGames(data.results))
      .catch(err => console.error("Error fetching relevant games:", err));

    // Juegos más nuevos: filtrados para el año actual, ordenados por fecha de lanzamiento descendente
   
    fetch(`${BASE_URL}/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-released&page_size=10`)
      .then(res => res.json())
      .then(data => setNewGames(data.results))
      .catch(err => console.error("Error fetching new games:", err));

    // Juegos más jugados: ordenados por "added" descendente
    fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=10`)
      .then(res => res.json())
      .then(data => setAddedGames(data.results))
      .catch(err => console.error("Error fetching added games:", err));
  }, []);

  return (
    <div id="body" className="min-h-screen bg-[#1C0021] text-[#40FFDC]">
      <Navbar />

      <div className="home">
        <header className="hero bg-[#1C3166] py-10 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a la Mejor Plataforma Gamer</h1>
          <input 
            type="text" 
            placeholder="Buscar juegos por nombre, género o popularidad..." 
            className="search-bar w-full max-w-md p-2 rounded border-2 border-[#00A9D4] bg-[#240047] text-[#40FFDC] placeholder-[#00A9D4] focus:outline-none focus:border-[#40FFDC]"
          />
        </header>

        {/* Juegos más relevantes */}
        <section className="relevant py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-[#00A9D4]">Juegos más populares actualmente</h2>
          <div className="game-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relevantGames.map(game => (
              <div key={game.id} className="game-card bg-[#240047] rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-4 text-xl font-semibold">{game.name}</h3>
                <a 
                  href={`/game/${game.id}`} 
                  className="inline-block mt-2 text-[#00A9D4] hover:underline"
                >
                  Ver detalles
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Juegos más nuevos */}
        <section className="new py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-[#00A9D4]">Juegos más nuevos</h2>
          <div className="game-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newGames.map(game => (
              <div key={game.id} className="game-card bg-[#240047] rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-4 text-xl font-semibold">{game.name}</h3>
                <a 
                  href={`/game/${game.id}`} 
                  className="inline-block mt-2 text-[#00A9D4] hover:underline"
                >
                  Ver detalles
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Juegos más jugados */}
        <section className="added py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-[#00A9D4]">Juegos más jugados</h2>
          <div className="game-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {addedGames.map(game => (
              <div key={game.id} className="game-card bg-[#240047] rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-4 text-xl font-semibold">{game.name}</h3>
                <a 
                  href={`/game/${game.id}`} 
                  className="inline-block mt-2 text-[#00A9D4] hover:underline"
                >
                  Ver detalles
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
