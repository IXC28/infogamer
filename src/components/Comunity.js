import React from 'react';
import './Community.css';

const Community = () => {
  return (
    <div className="community">
      <h1>Comunidad y Foros</h1>
      <section className="forums">
        <h2>Foros por Categoría</h2>
        <p>Espacios dedicados para discutir juegos, mods, configuraciones y hasta temas de piratería (¡con responsabilidad, claro!).</p>
      </section>
      <section className="reputation">
        <h2>Sistema de Reputación</h2>
        <p>Participa, comparte y gana puntos. ¡La fama gamer te espera!</p>
      </section>
      <section className="voting">
        <h2>Sistema de Votación</h2>
        <p>Vota respuestas útiles y ayuda a la comunidad a brillar (¡sin spoilers, por favor!).</p>
      </section>
    </div>
  );
};

export default Community;
