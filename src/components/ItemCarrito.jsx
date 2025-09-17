import React from "react";
import ProductCounter from "./ProductCounter";
const ItemCarrito = ({ item, onIncrementar, onDecrementar }) => (
  <div className="item-carrito">
    <span>
      {item.nombre} x {item.cantidad}
    </span>
    <span>${item.precio * item.cantidad}</span>
    <ProductCounter
      cantidad={item.cantidad}
      item={item}
      onIncrementar={onIncrementar}
      onDecrementar={onDecrementar}
    />
  </div>
);

export default ItemCarrito;
