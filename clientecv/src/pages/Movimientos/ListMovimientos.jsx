import React from "react";

export default function MovimientosList({ movimientos }) {
  if (!movimientos.length) {
    return <p className="text-center text-gray-500">No hay movimientos registrados.</p>;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-indigo-800 text-white">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Producto</th>
          <th className="px-4 py-2">Usuario</th>
          <th className="px-4 py-2">Tipo</th>
          <th className="px-4 py-2">Cantidad</th>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {movimientos.map((m) => (
          <tr key={m.id} className="border-b hover:bg-indigo-100">
            <td className="px-4 py-2">{m.id}</td>
            <td className="px-4 py-2">{m.producto.nombre}</td>
            <td className="px-4 py-2">{m.usuario.nombre}</td>
            <td className="px-4 py-2">{m.tipo}</td>
            <td className="px-4 py-2">{m.cantidad}</td>
            <td className="px-4 py-2">{new Date(m.fecha).toLocaleString()}</td>
            <td className="px-4 py-2">{m.observaciones || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
