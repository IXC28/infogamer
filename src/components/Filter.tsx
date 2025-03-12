import React, { useState, useEffect } from 'react';

interface FilterProps {
  onFiltersChange: (newFilters: { tags: string[]; devices: string[]; platforms: string[] }) => void;
  initialFilters?: { tags: string[]; devices: string[]; platforms: string[] };
}

const Filter: React.FC<FilterProps> = ({
  onFiltersChange,
  initialFilters = { tags: [], devices: [], platforms: [] },
}) => {
  const [filters, setFilters] = useState(initialFilters);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (
    category: 'tags' | 'devices' | 'platforms',
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((prev) => {
      const current = prev[category];
      if (e.target.checked) {
        return { ...prev, [category]: [...current, value] };
      } else {
        return { ...prev, [category]: current.filter((item) => item !== value) };
      }
    });
  };

  // Notifica al componente padre cada vez que se actualicen los filtros
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  return (
    <div className="mt-4 bg-gray-300 text-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1 - Por Tag */}
        <div className="md:pr-4 md:border-r text-left">
          <h4 className="text-xl font-semibold mb-3">Por Tag</h4>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Indie", e)}
              className="mr-2"
            />
            Indie
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Singleplayer", e)}
              className="mr-2"
            />
            Singleplayer
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Action", e)}
              className="mr-2"
            />
            Action
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Adventure", e)}
              className="mr-2"
            />
            Adventure
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Casual", e)}
              className="mr-2"
            />
            Casual
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Competitive", e)}
              className="mr-2"
            />
            Competitive
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "2D", e)}
              className="mr-2"
            />
            2D
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "MMORPGs", e)}
              className="mr-2"
            />
            MMORPGs
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Survival", e)}
              className="mr-2"
            />
            Survival
          </label>
          {/* Nuevos Tags (solamente el título antes de ":") */}
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Acción", e)}
              className="mr-2"
            />
            Acción
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Aventura", e)}
              className="mr-2"
            />
            Aventura
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Arcade", e)}
              className="mr-2"
            />
            Arcade
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Deportivo", e)}
              className="mr-2"
            />
            Deportivo
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Estrategia", e)}
              className="mr-2"
            />
            Estrategia
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Simulación", e)}
              className="mr-2"
            />
            Simulación
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Juegos de mesa", e)}
              className="mr-2"
            />
            Juegos de mesa
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Juegos musicales", e)}
              className="mr-2"
            />
            Juegos musicales
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Sandbox", e)}
              className="mr-2"
            />
            Sandbox
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Estrategia en tiempo real (RTS)", e)}
              className="mr-2"
            />
            Estrategia en tiempo real (RTS)
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Shooters", e)}
              className="mr-2"
            />
            Shooters
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "MOBA", e)}
              className="mr-2"
            />
            MOBA
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Juegos de rol (RPG)", e)}
              className="mr-2"
            />
            Juegos de rol (RPG)
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Puzzles", e)}
              className="mr-2"
            />
            Puzzles
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Juegos de fiesta", e)}
              className="mr-2"
            />
            Juegos de fiesta
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("tags", "Acción-aventura", e)}
              className="mr-2"
            />
            Acción-aventura
          </label>
        </div>
        {/* 2 - Por dispositivo */}
        <div className="md:pr-4 md:border-r text-left">
          <h4 className="text-xl font-semibold mb-3">Por dispositivo</h4>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("devices", "PC", e)}
              className="mr-2"
            />
            PC
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("devices", "Playstation", e)}
              className="mr-2"
            />
            Playstation
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("devices", "Xbox", e)}
              className="mr-2"
            />
            Xbox
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("devices", "Nintendo", e)}
              className="mr-2"
            />
            Nintendo
          </label>
        </div>
        {/* 3 - Por plataforma */}
        <div className="text-left">
          <h4 className="text-xl font-semibold mb-3">Por plataforma</h4>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("platforms", "Steam", e)}
              className="mr-2"
            />
            Steam
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("platforms", "Epic", e)}
              className="mr-2"
            />
            Epic
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("platforms", "Playstation", e)}
              className="mr-2"
            />
            Playstation
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("platforms", "Nintendo", e)}
              className="mr-2"
            />
            Nintendo
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange("platforms", "Xbox", e)}
              className="mr-2"
            />
            Xbox
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;