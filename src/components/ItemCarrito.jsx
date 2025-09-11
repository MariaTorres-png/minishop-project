import React from 'react';;
import ProductCounter from './ProductCounter';
const ItemCarrito = ({ item, onIncrementar, onDecrementar, onEliminar }) => (
  <div className="item-carrito">
    <span>{item.nombre} x {item.cantidad}</span>
    <span>${item.precio * item.cantidad}</span>
    <ProductCounter 
      cantidad={item.cantidad} 
      onIncrementar={() => onIncrementar(item.id)} 
      onDecrementar={() => onDecrementar(item.id)} 
    />
    <button onClick={() => onEliminar(item.id)}>Eliminar</button>
  </div>
);

export default ItemCarrito;
