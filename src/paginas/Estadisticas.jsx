import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  top_productos: [
    { producto: "Conejito", total_vendido: 15 },
    { producto: "Osito", total_vendido: 10 },
    { producto: "Gatito", total_vendido: 8 },
    { producto: "Perro", total_vendido: 6 },
    { producto: "Pulpo", total_vendido: 5 },
  ],
  ventas_por_dia: [
    { fecha: "2025-09-15", total_dinero: 50 },
    { fecha: "2025-09-16", total_dinero: 70 },
    { fecha: "2025-09-17", total_dinero: 90 },
    { fecha: "2025-09-18", total_dinero: 40 },
  ],
};

const Estadisticas = () => {
  const [datos, setDatos] = useState({ top_productos: [], ventas_por_dia: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/estadisticas/ventas?fecha_inicio=2025-09-15&fecha_fin=2025-09-30"
        );

        if (!res.ok) throw new Error("Error al obtener estadísticas");
        const data = await res.json();

        // Aseguramos que los datos tengan las claves correctas
        setDatos({
          top_productos: data.top_productos || [],
          ventas_por_dia: data.ventas_por_dia || [],
        });
      } catch (error) {
        console.error("⚠️ Error cargando estadísticas:", error);
        console.warn("Usando datos de prueba (mock)...");
        setDatos(mockData); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Cargando estadísticas...</p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        📊 Estadísticas de Ventas
      </h1>

      {/* --- Top 5 productos --- */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">
          🏆 Top 5 Productos
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos.top_productos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="producto" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_vendido" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- Ventas por día --- */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">
          📅 Ventas por Día
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datos.ventas_por_dia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_dinero" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Estadisticas;
