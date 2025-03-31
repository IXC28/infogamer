"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Definición de la interfaz para un juego (incluyendo descripción)
interface Game {
  id: number;
  title: string;
  img: string;
  description?: string;
}

interface RankingData {
  populares: Game[];
  lanzamientosRecientes: Game[];
  mejorValorados: Game[];
  recomendaciones: Game[];
}

interface RankingSectionProps {
  title: string;
  games: Game[];
}

const RankingSection: React.FC<RankingSectionProps> = ({ title, games }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.9;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-red-600">{title}</h2>
      <div className="relative">
        {/* Flecha izquierda */}
        <button
          onClick={() => scroll("left")}
          className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <span className="text-white text-2xl">←</span>
        </button>
        {/* Contenedor para el carrusel */}
        <div className="px-8">
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide m-8"
          >
            {games.map((game) => (
              <Link key={game.id} href={`/details/${game.id}`}>
                <div className="w-[250px] flex-shrink-0 bg-black rounded-md p-4 hover:bg-gray-800 transition-colors shadow-md cursor-pointer h-full">
                  <img
                    src={game.img}
                    alt={game.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="text-white text-xl text-center">{game.title}</h3>
                  {game.description && (
                    <div
                      className="text-white text-sm mt-2 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: game.description }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Flecha derecha */}
        <button
          onClick={() => scroll("right")}
          className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <span className="text-white text-2xl">→</span>
        </button>
      </div>
    </section>
  );
};

export default function RankingPage() {
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ranking")
      .then((res) => res.json())
      .then((data) => {
        setRankingData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ranking data:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        Loading...
      </div>
    );

  if (!rankingData)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        No ranking data available
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Ranking de Juegos
        </h1>
        <RankingSection title="Juegos más populares" games={rankingData.populares} />
        <RankingSection title="Lanzamientos recientes" games={rankingData.lanzamientosRecientes} />
        <RankingSection title="Mejor valorados" games={rankingData.mejorValorados} />
        <RankingSection title="Recomendaciones" games={rankingData.recomendaciones} />
      </div>
      <Footer />
    </div>
  );
}
