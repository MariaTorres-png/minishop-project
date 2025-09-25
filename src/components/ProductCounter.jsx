import React from "react";

const ProductCounter = ({ cantidad, onIncrementar, onDecrementar, item }) => (
  <div className="product-counter">
    <button
      className="disminuir"
      onClick={() => onDecrementar(item)}
      disabled={cantidad <= 0}
    >
      -
    </button>
    <span>{cantidad}</span>
    <button className="aumentar" onClick={() => onIncrementar(item)}>
      +
    </button>
  </div>
);

export default ProductCounter;
