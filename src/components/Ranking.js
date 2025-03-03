import React from 'react';
import './Ranking.css';

const Ranking = () => {
  // Datos dummy para mostrar rankings
  const topDownloads = [
    { id: 1, name: 'Juego A', downloads: 1000 },
    { id: 2, name: 'Juego B', downloads: 900 }
  ];
  const topPlayed = [
    { id: 1, name: 'Juego C', plays: 2000 },
    { id: 2, name: 'Juego D', plays: 1800 }
  ];
  const topSearched = [
    { id: 1, name: 'Juego E', searches: 500 },
    { id: 2, name: 'Juego F', searches: 450 }
  ];

  return (
    <div className="ranking">
      <h1>Ranking y Estadísticas</h1>
      <section className="ranking-section">
        <h2>Top 10 Juegos Más Descargados</h2>
        <ul>
          {topDownloads.map(game => (
            <li key={game.id}>{game.name} - {game.downloads} descargas</li>
          ))}
        </ul>
      </section>
      <section className="ranking-section">
        <h2>Top 10 Juegos Más Jugados</h2>
        <ul>
          {topPlayed.map(game => (
            <li key={game.id}>{game.name} - {game.plays} jugados</li>
          ))}
        </ul>
      </section>
      <section className="ranking-section">
        <h2>Top 10 Juegos Más Buscados</h2>
        <ul>
          {topSearched.map(game => (
            <li key={game.id}>{game.name} - {game.searches} búsquedas</li>
          ))}
        </ul>
      </section>
      <div className="comparison">
        <h2>Comparación entre Plataformas</h2>
        <p>Datos comparativos entre PC y Consolas (¡aquí se desatan los duelos entre gamers de cada plataforma!)</p>
      </div>
    </div>
  );
};

export default Ranking;
