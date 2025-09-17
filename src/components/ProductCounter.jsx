import React from "react";

const ProductCounter = ({ cantidad, onIncrementar, onDecrementar, item }) => (
  <div className="product-counter">
    <button onClick={() => onDecrementar(item)} disabled={cantidad <= 0}>
      -
    </button>
    <span>{cantidad}</span>
    <button onClick={() => onIncrementar(item)}>+</button>
  </div>
);

export default ProductCounter;
