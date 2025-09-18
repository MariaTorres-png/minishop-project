import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Formulario = () => {
  const [form, setForm] = useState({
    nombre: "",
    documento: "",
    direccion: "",
    pago: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const carrito = location.state?.carrito || [];
  const total = Array.isArray(carrito)
    ? carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ nombre: "", documento: "", direccion: "", pago: "" });
    alert("¡Pedido completado!");
    navigate("/");
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
          <label>Documento de identidad:</label>
          <input
            name="documento"
            value={form.documento}
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
