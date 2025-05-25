import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductoForm from "./pages/Productos/FormProducto";
import SearchProducto from "./pages/Productos/SearchProducto";
import MovimientoList from "./pages/Movimientos/ListMovimientos";
import ListProductos from "./pages/Productos/ListProductos.jsx";

function App() {
  return (
    <main className=" h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProductos />} />
          <Route path="/productos/new" element={<ProductoForm />} />
          <Route path="/productos/:id/edit" element={<ProductoForm />} />
          <Route path="/productos/search" element={<SearchProducto />} />
          <Route path="/movimientos" element={<MovimientoList />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
