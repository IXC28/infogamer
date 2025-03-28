import React, { useRef } from "react";

interface Game {
  id: number;
  title: string;
  img: string;
}

interface RankingSectionProps {
  title: string;
  games: Game[];
}

export default function RankingSection({ title, games }: RankingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para desplazar el contenedor horizontalmente
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Ajusta este valor según el ancho de cada tarjeta y la cantidad a desplazar (ej. 3 tarjetas)
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
        {/* Botón izquierda */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
        >
          ←
        </button>
        {/* Contenedor del carrusel */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="min-w-[300px] flex-shrink-0 bg-black rounded-md p-4 hover:bg-gray-800 transition-colors shadow-md"
            >
              <img
                src={game.img}
                alt={game.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-white text-xl">{game.title}</h3>
              <a
                href={`/details/${game.id}`}
                className="block mt-2 bg-red-600 text-white px-3 py-1 rounded-md text-center hover:bg-red-700 transition-colors"
              >
                Ver Detalles
              </a>
            </div>
          ))}
        </div>
        {/* Botón derecha */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
        >
          →
        </button>
      </div>
    </section>
  );
}