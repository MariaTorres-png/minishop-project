import React, { useState, useEffect } from "react";
import BarraBusqueda from "../components/BarraBusqueda";
import CuadriculaProductos from "../components/CuadriculaProductos";
import { API_URL } from "../config";

const Catalogo = ({ cantidades, onAgregar }) => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();

        // 🔥 Adaptar claves a lo que tu CuadriculaProductos espera
        const productosTransformados = data.map((p) => ({
          id: p.id_producto,
          nombre: p.nombre_producto,
          descripcion: p.descripcion,
          precio: p.precio,
          imagen: p.imagen_url,
          activo: p.activo,
        }));

        setProductos(productosTransformados);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  const productosFiltrados = productos.filter((p) =>
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
