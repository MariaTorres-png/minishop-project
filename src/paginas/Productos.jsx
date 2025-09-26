import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "../config";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    activo: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/productos`);
      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();

      setProductos(
        data.map((p) => ({
          id: p.id_producto,
          nombre: p.nombre_producto,
          descripcion: p.descripcion,
          precio: p.precio,
          imagen: p.imagen_url,
          activo: p.activo,
        }))
      );
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre y el precio son obligatorios.",
      });
      return;
    }

    try {
      if (form.id) {
        await fetch(`${API_URL}/productos/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_producto: form.nombre,
            descripcion: form.descripcion,
            precio: form.precio,
            imagen_url: form.imagen,
            activo: form.activo,
          }),
        });
        Swal.fire({
          icon: "info",
          title: "Producto actualizado",
          text: "Los cambios se han guardado correctamente.",
          timer: 2000,
        });
      } else {
        await fetch(`${API_URL}/productos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_producto: form.nombre,
            descripcion: form.descripcion,
            precio: form.precio,
            imagen_url: form.imagen,
            activo: form.activo,
          }),
        });
        Swal.fire({
          icon: "success",
          title: "¡Producto creado!",
          text: "El producto se ha creado exitosamente.",
          timer: 2000,
        });
      }

      fetchProductos();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
      Swal.fire({
        icon: "warning",
        title: "Producto eliminado",
        text: "El producto ha sido eliminado.",
        timer: 2000,
      });
      fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      activo: producto.activo,
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
      activo: true,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="imagen"
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {form.id ? "Actualizar" : "Crear"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA DE PRODUCTOS */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <ul className="space-y-2">
          {productos.map((p) => (
            <li
              key={p.id}
              className="border p-3 flex justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {p.imagen && (
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <strong>{p.nombre}</strong> - ${p.precio}
                  <p className="text-sm">{p.descripcion}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Productos;
