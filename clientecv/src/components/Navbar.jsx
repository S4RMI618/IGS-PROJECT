import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-800 text-white px-4 py-3 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tienda Naturista</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-200"
              }
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movimientos"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-200"
              }
            >
              Movimientos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
