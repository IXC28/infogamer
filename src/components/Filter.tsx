import React, { useState, useEffect } from 'react';

interface FilterProps {
  onFiltersChange: (newFilters: { tags: string[]; devices: string[]; platforms: string[] }) => void;
  initialFilters?: { tags: string[]; devices: string[]; platforms: string[] };
}

const availableTags = [
  "Indie",
  "Singleplayer",
  "Casual",
  "Competitive",
  "2D",
  "MMORPGs",
  "Survival",
  "Acción",
  "Aventura",
  "Arcade",
  "Deportivo",
  "Estrategia",
  "Simulación",
  "Juegos de mesa",
  "Juegos musicales",
  "Sandbox",
  "Estrategia en tiempo real (RTS)",
  "Shooters",
  "MOBA",
  "Juegos de rol (RPG)",
  "Puzzles",
  "Juegos de fiesta",
  "Acción-aventura",
];

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
          {availableTags.map((tag) => (
            <label key={tag} className="block mb-2">
              <input
                type="checkbox"
                onChange={(e) => handleFilterChange("tags", tag, e)}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
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