export default function ProductItem({ producto, onEdit, onDelete }) {
  return (
    <tr>
      <td className="px-6 py-3">{producto.id}</td>
      <td className="px-6 py-3">{producto.nombre}</td>
      <td className="px-6 py-3 text-center">{producto.codigo}</td>
      <td className="px-6 py-3 text-center">{producto.stock}</td>
      <td className="px-6 py-3 text-center">{producto.precioUnitario}</td>
      <td className="px-6 py-3 space-x-2 grid grid-cols-2 gap-6">
        <button
          onClick={onEdit}
          className="flex items-center justify-center"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center"
        >
          ❌
        </button>
      </td>
    </tr>
  );
}
