import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Catalogo from './paginas/Catalogo';
import Pago from './paginas/Pago';
import Exito from './paginas/Exito';
import Encabezado from './components/Encabezado';
import { useTheme } from './components/ThemeContext';

const AppRouter = () => {
  const [carrito, setCarrito] = useState([]);

  const { theme, toggleTheme } = useTheme();

  // Obtener cantidades por producto
  const cantidades = carrito.reduce((acc, item) => {
    acc[item.id] = item.cantidad;
    return acc;
  }, {});

  const handleAgregar = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const handleIncrementar = (producto) => {
    handleAgregar(producto);
  };

  const handleDecrementar = (producto) => {
    setCarrito(prev => {
      return prev
        .map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter(item => item.cantidad > 0);
    });
  };

  const handleEliminar = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const handlePagar = (navigate) => {
    setCarrito([]);
    navigate('/exito');
  };

  return (
    <Router>
      <Encabezado onToggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Catalogo
          onAgregar={handleAgregar}
          cantidades={cantidades}
          onIncrementar={handleIncrementar}
          onDecrementar={handleDecrementar}
        />} />
        <Route path="/pago" element={<Pago carrito={carrito} onIncrementar={handleIncrementar} onDecrementar={handleDecrementar} onEliminar={handleEliminar} onPagar={() => handlePagar(useNavigate())} />} />
        <Route path="/exito" element={<Exito />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
