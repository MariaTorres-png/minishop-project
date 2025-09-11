import React from 'react';
import { Link } from 'react-router-dom';

const Encabezado = ({ onToggleTheme, theme }) => (
  <header className="encabezado">
    <h1>Minitienda</h1>
    <nav>
      <Link to="/">Catálogo</Link>
      <Link to="/pago">Pago</Link>
    </nav>
    <button onClick={onToggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </header>
);

export default Encabezado;
