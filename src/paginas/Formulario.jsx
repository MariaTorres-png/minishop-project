import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Formulario = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "", // ✅ agregado para capturar email
    direccion: "",
    pago: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const carrito = location.state?.carrito || [];

  // Calcula el total dinámicamente
  const total = Array.isArray(carrito)
    ? carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre_usuario: form.nombre,
      email: form.email,
      total,
      detalles: carrito.map((item) => ({
        // Usar id_producto si existe, si no, usar id
        id_producto: item.id_producto ?? item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      })),
    };

    console.log("Payload que se enviará:", payload);

    // Validación para evitar enviar productos sin id
    if (payload.detalles.some((d) => d.id_producto === undefined)) {
      console.error(
        "⚠️ Hay productos sin id_producto en el carrito:",
        payload.detalles
      );

      Swal.fire({
        icon: "error",
        title: "¡Oh no! 😿",
        text: "Uno o más productos no tienen un ID válido. Revisa tu carrito, porfis.",
        confirmButtonText: "Entendido 💔",
      });

      return;
    }

    try {
      const response = await fetch("http://localhost:5000/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Ups... algo salió mal 🧸",
          text:
            errorData.error || "No se pudo crear el pedido. Intenta más tarde.",
          confirmButtonText: "Okidoki 💔",
        });

        return;
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "¡Pedido enviado con éxito! 🎉🍰",
        text: "Gracias por tu compra, tu pedido está en camino con mucho amor 💌",
        confirmButtonText: "¡Yay! 💖",
      }).then(() => {
        navigate("/");
      });

      // Limpia el formulario y vuelve al inicio
      setForm({ nombre: "", email: "", direccion: "", pago: "" });
      navigate("/");
    } catch (err) {
      console.error("🚨 Error al enviar el pedido:", err);
      Swal.fire({
        icon: "error",
        title: "¡Conexión fallida! 🌧️",
        text: "No se pudo enviar el pedido. Revisa tu internet y vuelve a intentarlo.",
        confirmButtonText: "Lo intentaré de nuevo 🐾",
      });
    }
  };

  return (
    <div>
      <h2>Formulario de compra</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombres completos:</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Información de pago:</label>
          <input
            name="pago"
            value={form.pago}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <strong>Total a pagar: ${total}</strong>
        </div>
        <button type="submit">Finalizar pedido</button>
      </form>
    </div>
  );
};

export default Formulario;
