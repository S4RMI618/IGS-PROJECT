import React from "react";

export default function ProductItem({ id, nombre, codigo, stock }) {
  return (
    <tr className="hover:bg-indigo-300 transition-colors">
      <td className="px-6 py-4 text-center">{id}</td>
      <td className="px-6 py-4">{nombre}</td>
      <td className="px-6 py-4 text-center">{codigo}</td>
      <td className="px-6 py-4 text-center">{stock}</td>
    </tr>
  );
}