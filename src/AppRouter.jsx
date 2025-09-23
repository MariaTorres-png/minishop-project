import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Catalogo from "./paginas/Catalogo";
import Pago from "./paginas/Pago";
import Formulario from "./paginas/Formulario";
import Productos from "./paginas/Productos";
import Encabezado from "./components/Encabezado";
import { useTheme } from "./components/ThemeContext";

const AppRouter = () => {
  const [carrito, setCarrito] = useState([]);
  const { theme, toggleTheme } = useTheme();

  // Obtener cantidades por producto
  const cantidades = carrito.reduce((acc, item) => {
    acc[item.id] = item.cantidad;
    return acc;
  }, {});

  const handleAgregar = (producto) => {
    if (!producto || !producto.id) {
      console.warn("Producto inválido:", producto);
      return;
    }
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const handleIncrementar = (producto) => handleAgregar(producto);

  const handleDecrementar = (producto) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const handlePagar = (navigate) => {
    setCarrito([]);
    navigate("/Formulario");
  };

  return (
    <Router>
      <Encabezado onToggleTheme={toggleTheme} theme={theme} carrito={carrito} />
      <Routes>
        {/* Ruta principal (catálogo) */}
        <Route
          path="/"
          element={
            <Catalogo onAgregar={handleAgregar} cantidades={cantidades} />
          }
        />

        {/* Carrito y pago */}
        <Route
          path="/pago"
          element={
            <Pago
              carrito={carrito}
              onIncrementar={handleIncrementar}
              onDecrementar={handleDecrementar}
              onPagar={() => handlePagar(useNavigate())}
            />
          }
        />

        {/* Formulario de compra */}
        <Route path="/Formulario" element={<Formulario />} />

        {/* CRUD de productos */}
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
