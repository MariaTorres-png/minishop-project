import React from "react";
import { Link } from "react-router-dom";

const Encabezado = ({ onToggleTheme, theme, carrito }) => {
  const totalProductos = carrito
    ? carrito.reduce((acc, item) => acc + item.cantidad, 0)
    : 0;
  return (
    <header className="encabezado">
      <h1>Minitienda</h1>
      <nav>
        <Link
          to="/pago"
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            src="/src/assets/anadir-al-carrito.png"
            alt="Carrito"
            style={{ width: 24, verticalAlign: "middle", marginRight: 8 }}
          />
          {totalProductos > 0 && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {totalProductos}
            </span>
          )}
        </Link>
      </nav>
      <button onClick={onToggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
      <Link to="/productos"> CRUD Productos</Link>
      <Link to="/estadisticas"> Gráficas </Link>
    </header>
  );
};

export default Encabezado;
