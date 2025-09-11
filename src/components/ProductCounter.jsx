import React from 'react';

const ProductCounter = ({ cantidad, onIncrementar, onDecrementar }) => (
  <div className="product-counter">
    <button onClick={onDecrementar} disabled={cantidad <= 0}>-</button>
    <span>{cantidad}</span>
    <button onClick={onIncrementar}>+</button>
  </div>
);

export default ProductCounter;
