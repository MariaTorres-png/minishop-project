import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "./paginas/Catalogo";
import Pago from "./paginas/Pago";
import Formulario from "./paginas/formulario";
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
        const nuevoCarrito = prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        console.log(
          "Incrementando cantidad:",
          producto,
          "Carrito:",
          nuevoCarrito
        );
        return nuevoCarrito;
      }

      const nuevoCarrito = [...prev, { ...producto, cantidad: 1 }];
      console.log(
        "Agregando nuevo producto:",
        producto,
        "Carrito:",
        nuevoCarrito
      );
      return nuevoCarrito;
    });
  };

  const handleIncrementar = (producto) => {
    handleAgregar(producto);
    console.log("Incrementar", producto);
  };

  const handleDecrementar = (producto) => {
    setCarrito((prev) => {
      return prev
        .map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);
    });
  };

  const handlePagar = (navigate) => {
    setCarrito([]);
    navigate("/Formulario");
  };

  return (
    <Router>
      <Encabezado onToggleTheme={toggleTheme} theme={theme} carrito={carrito} />
      <Routes>
        <Route
          path="/"
          element={
            <Catalogo onAgregar={handleAgregar} cantidades={cantidades} />
          }
        />
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
        <Route path="/Formulario" element={<Formulario />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
