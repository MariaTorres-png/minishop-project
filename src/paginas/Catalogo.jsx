import React, { useState } from 'react';
import BarraBusqueda from '../components/BarraBusqueda';
import CuadriculaProductos from '../components/CuadriculaProductos';

const productosIniciales = [
  { id: 1, nombre: 'Camiseta', descripcion: 'Camiseta 100% algodón', precio: 15, imagen: '/vite.svg' },
  { id: 2, nombre: 'Pantalón', descripcion: 'Pantalón cómodo', precio: 25, imagen: '/vite.svg' },
  { id: 3, nombre: 'Gorra', descripcion: 'Gorra deportiva', precio: 10, imagen: '/vite.svg' },
];

const Catalogo = ({cantidades, onAgregar}) => {
  const [busqueda, setBusqueda] = useState('');
  const productosFiltrados = productosIniciales.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <BarraBusqueda valor={busqueda} onBuscar={setBusqueda} />
      <CuadriculaProductos
        productos={productosFiltrados}
        cantidades={cantidades}
        onAgregar={onAgregar}
      />
    </div>
  );
};

export default Catalogo;
