"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [trendingGames, setTrendingGames] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulación de una llamada a API para juegos en tendencia y noticias
    setTrendingGames([
      { id: 1, name: 'Cyberpunk 2077', image: 'cyberpunk.jpg' },
      { id: 2, name: 'The Witcher 3', image: 'witcher3.jpg' },
    ]);
    setNews([
      { id: 1, title: 'Nuevo lanzamiento de juego', link: '#' },
      { id: 2, title: 'Oferta exclusiva en plataforma oficial', link: '#' },
    ]);
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
        <section className="trending py-8 px-4">
          <h2 className="text-2xl font-bold mb-6 text-[#00A9D4]">Tendencias actuales</h2>
          <div className="game-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trendingGames.map(game => (
              <div key={game.id} className="game-card bg-[#240047] rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={game.image} alt={game.name} className="w-full h-40 object-cover rounded" />
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
        <section className="news py-8 px-4">
          <h2 className="text-2xl font-bold mb-4 text-[#00A9D4]">Noticias y Novedades</h2>
          <ul className="space-y-3">
            {news.map(item => (
              <li key={item.id}>
                <a 
                  href={item.link} 
                  className="text-lg text-[#40FFDC] hover:text-[#00A9D4] transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
}
