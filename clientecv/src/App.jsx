import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductoForm from "./pages/Productos/FormProducto";
import SearchProducto from "./pages/Productos/SearchProducto";
import Navbar from "./components/Navbar.jsx";
import ListProductos from "./pages/Productos/ListProductos.jsx";
import MovimientosPage from "./pages/Movimientos/MovimientosPage.jsx";

function App() {
  return (
    <main className=" h-screen w-full">
      <BrowserRouter>
        <Navbar />  
        <Routes>
          <Route path="/movimientos" element={<MovimientosPage />} />
          <Route path="/productos" element={<ListProductos />} />
          <Route path="/productos/new" element={<ProductoForm />} />
          <Route path="/productos/:id/edit" element={<ProductoForm />} />
          <Route path="/productos/search" element={<SearchProducto />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
