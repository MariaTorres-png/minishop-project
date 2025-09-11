import React from 'react';
import ItemCarrito from '../components/ItemCarrito';
import { Link } from 'react-router-dom';

const Pago = ({ carrito, cantidad, onIncrementar, OnDecrementar, onEliminar, onPagar }) => (
  <div>
    <h2>Carrito</h2>
    {carrito.length === 0 ? (
      <p>El carrito está vacío.</p>
    ) : (
      <div>
        {carrito.map(item => (
          <ItemCarrito key={item.id} 
          item={item} 
          cantidad={cantidad}
          onIncrementar={onIncrementar} 
          onDecrementar={OnDecrementar}
          onEliminar={onEliminar} 
          />
        ))}
        <button onClick={onPagar}>Pagar</button>
      </div>
    )}
    <Link to="/">Volver al catálogo </Link>
  </div>
);

export default Pago;
