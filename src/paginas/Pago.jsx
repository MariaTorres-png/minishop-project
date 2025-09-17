import React from "react";
import ItemCarrito from "../components/ItemCarrito";
import { Link, useNavigate } from "react-router-dom";

const Pago = ({ carrito, cantidad, onIncrementar, onDecrementar }) => {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handlePagar = () => {
    navigate("/Formulario", { state: { total } });
  };

  return (
    <div>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((item) => (
            <ItemCarrito
              key={item.id}
              item={item}
              cantidad={cantidad}
              onIncrementar={onIncrementar}
              onDecrementar={onDecrementar}
            />
          ))}
          <button onClick={handlePagar}>Pagar</button>
        </div>
      )}
      <Link to="/">Volver al catálogo </Link>
    </div>
  );
};

export default Pago;
