import React from 'react';
import './Downloads.css';

const Downloads = () => {
  return (
    <div className="downloads">
      <h1>Descargas y Tutoriales</h1>
      <section className="guides">
        <h2>Guías de Instalación</h2>
        <p>Instrucciones paso a paso para instalar juegos en PC, consolas y más.</p>
      </section>
      <section className="errors">
        <h2>Solución de Errores Comunes</h2>
        <p>Consejos y tutoriales para resolver problemas durante la instalación.</p>
      </section>
      <section className="configuration">
        <h2>Configuración Óptima</h2>
        <p>Optimiza el rendimiento de tu equipo, ya sea de gama baja o alta. ¡Adiós lag!</p>
      </section>
    </div>
  );
};

export default Downloads;
