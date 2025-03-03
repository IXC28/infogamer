import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Simula una llamada a API para obtener detalles del juego por id
    setGame({
      id,
      name: 'Cyberpunk 2077',
      image: 'cyberpunk.jpg',
      trailer: 'https://www.youtube.com/embed/XYZ', // enlace dummy al tráiler
      description: 'Descripción general del juego con una historia futurista y llena de acción.',
      requirements: {
        minimum: 'CPU: Intel i5, RAM: 8GB, GPU: GTX 780',
        recommended: 'CPU: Intel i7, RAM: 16GB, GPU: RTX 2060'
      },
      installationGuide: 'Guía detallada para instalar y configurar el juego en tu sistema.',
      mode: 'Singleplayer / Multijugador',
      category: 'RPG',
      tags: ['Futurista', 'Acción', 'Open World'],
      downloadLinks: {
        original: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
        pirated: '#'
      }
    });
  }, [id]);

  if (!game) return <div>Cargando...</div>;

  return (
    <div className="game-detail">
      <h1>{game.name}</h1>
      <div className="media">
        <img src={game.image} alt={game.name} />
        <iframe
          title="Trailer"
          src={game.trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>{game.description}</p>
      <div className="requirements">
        <h3>Requisitos Mínimos</h3>
        <p>{game.requirements.minimum}</p>
        <h3>Requisitos Recomendados</h3>
        <p>{game.requirements.recommended}</p>
      </div>
      <div className="installation">
        <h3>Guía de Instalación</h3>
        <p>{game.installationGuide}</p>
      </div>
      <div className="mode">
        <h3>Modo de Juego</h3>
        <p>{game.mode}</p>
      </div>
      <div className="category">
        <h3>Categoría</h3>
        <p>{game.category}</p>
      </div>
      <div className="tags">
        <h3>Etiquetas</h3>
        <ul>
          {game.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="download-links">
        <h3>Descargar</h3>
        <a href={game.downloadLinks.original} target="_blank" rel="noopener noreferrer">Original</a>
        <a href={game.downloadLinks.pirated} target="_blank" rel="noopener noreferrer">Pirateado</a>
      </div>
      <div className="forum">
        <h3>Foro de Discusión</h3>
        <p>Aquí se mostrarían los comentarios y debates de la comunidad (¡porque ningún gamer se salva sin su foro!)</p>
      </div>
    </div>
  );
};

export default GameDetail;
