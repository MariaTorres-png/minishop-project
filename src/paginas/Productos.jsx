// src/paginas/Productos.jsx
import React, { useEffect, useState } from "react";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion: "",
    imagen_url: "",
    precio: "",
    activo: true,
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:5000/productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error obteniendo productos", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = modoEdicion
        ? `http://localhost:5000/productos/${productoActual.id_producto}`
        : "http://localhost:5000/productos";
      const method = modoEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (res.ok) {
        obtenerProductos();
        resetForm();
      } else {
        const error = await res.json();
        console.error("Error:", error);
      }
    } catch (err) {
      console.error("Error creando producto", err);
    }
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);
    setNuevoProducto({
      nombre_producto: producto.nombre_producto,
      descripcion: producto.descripcion,
      imagen_url: producto.imagen_url,
      precio: producto.precio,
      activo: producto.activo,
    });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:5000/productos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        obtenerProductos();
      }
    } catch (err) {
      console.error("Error eliminando producto", err);
    }
  };

  const resetForm = () => {
    setNuevoProducto({
      nombre_producto: "",
      descripcion: "",
      imagen_url: "",
      precio: "",
      activo: true,
    });
    setModoEdicion(false);
    setProductoActual(null);
  };

  return (
    <div className="p-4">
      <h1>{modoEdicion ? "Editar producto" : "Crear producto"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          name="nombre_producto"
          placeholder="Nombre"
          value={nuevoProducto.nombre_producto}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen_url"
          placeholder="URL de imagen"
          value={nuevoProducto.imagen_url}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? "Actualizar" : "Crear"}</button>
        {modoEdicion && <button onClick={resetForm}>Cancelar</button>}
      </form>

      <h2>Lista de productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id_producto} className="border p-2 mb-2">
            <strong>{p.nombre_producto}</strong> - ${p.precio}
            <button onClick={() => handleEditar(p)}>✏️ Editar</button>
            <button onClick={() => handleEliminar(p.id_producto)}>
              🗑 Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
