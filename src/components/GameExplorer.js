import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameExplorer.css';

const GameExplorer = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    downloadType: '',
    popularity: ''
  });

  useEffect(() => {
    // Simulación de llamada a API para obtener la lista de juegos
    setGames([
      { id: 1, name: 'Cyberpunk 2077', image: 'cyberpunk.jpg', platform: 'PC', genre: 'RPG' },
      { id: 2, name: 'The Witcher 3', image: 'witcher3.jpg', platform: 'PC', genre: 'RPG' },
      // Más juegos con datos dummy
    ]);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredGames = games.filter(game => {
    return (!filters.platform || game.platform === filters.platform) &&
           (!filters.genre || game.genre === filters.genre);
  });

  return (
    <div className="explorer">
      <h1>Explorador de Juegos</h1>
      <div className="filters">
        <select name="platform" onChange={handleFilterChange}>
          <option value="">Plataforma</option>
          <option value="PC">PC</option>
          <option value="PS5">PS5</option>
          <option value="Xbox">Xbox</option>
          <option value="Switch">Switch</option>
        </select>
        <select name="genre" onChange={handleFilterChange}>
          <option value="">Género</option>
          <option value="RPG">RPG</option>
          <option value="FPS">FPS</option>
          <option value="Aventura">Aventura</option>
          <option value="Terror">Terror</option>
        </select>
        {/* Puedes agregar más filtros (Tipo de descarga, Popularidad, etc.) */}
      </div>
      <div className="game-grid">
        {filteredGames.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.image} alt={game.name} />
            <h3>{game.name}</h3>
            <Link to={`/game/${game.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameExplorer;
