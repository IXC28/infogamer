import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Estilos específicos para Home

const Home = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulación de una llamada a API para juegos en tendencia y noticias
    setTrendingGames([
      { id: 1, name: 'Cyberpunk 2077', image: 'cyberpunk.jpg' },
      { id: 2, name: 'The Witcher 3', image: 'witcher3.jpg' },
      // ¡Agrega más juegos con imágenes y detalles ciberpunk si te atreves!
    ]);
    setNews([
      { id: 1, title: 'Nuevo lanzamiento de juego', link: '#' },
      { id: 2, title: 'Oferta exclusiva en plataforma oficial', link: '#' },
    ]);
  }, []);

  return (
    <div className="home">
      <header className="hero">
        <h1>Bienvenido a la Mejor Plataforma Gamer</h1>
        <input type="text" placeholder="Buscar juegos por nombre, género o popularidad..." className="search-bar" />
      </header>
      <section className="trending">
        <h2>Tendencias actuales</h2>
        <div className="game-grid">
          {trendingGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.name} />
              <h3>{game.name}</h3>
              <Link to={`/game/${game.id}`}>Ver detalles</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="news">
        <h2>Noticias y Novedades</h2>
        <ul>
          {news.map(item => (
            <li key={item.id}><a href={item.link}>{item.title}</a></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
