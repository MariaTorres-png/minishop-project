import React from 'react';

const BarraBusqueda = ({ valor, onBuscar }) => (
  <input
    type="text"
    placeholder="Buscar productos..."
    value={valor}
    onChange={e => onBuscar(e.target.value)}
    className="barra-busqueda"
  />
);

export default BarraBusqueda;
