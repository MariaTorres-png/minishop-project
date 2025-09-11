import React from 'react';

import TarjetaProducto from './TarjetaProducto';

const CuadriculaProductos = ({ productos, onAgregar}) => (
  <div className="cuadricula-productos">
    {productos.map(producto => (
      <TarjetaProducto
        key={producto.id}
        producto={producto}
        onAgregar={onAgregar}
      />
    ))}
  </div>
);

export default CuadriculaProductos;
