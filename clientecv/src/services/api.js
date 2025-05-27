// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

// Productos
export const fetchProductos       = () => api.get('/productos');
export const fetchProductoById   = id => api.get(`/productos/${id}`);
export const searchProductoByCode= codigo => api.get(`/productos/search`, { params: { codigo } });
export const fetchLowStock       = nivel => api.get('/productos/alerta-stock', { params: { nivel } });
export const createProducto      = data => api.post('/productos', data);
export const updateProducto      = (id, data) => api.put(`/productos/${id}`, data);
export const adjustStock         = (id, delta) => api.patch(`/productos/${id}/stock`, null, { params: { cantidadDelta: delta } });
export const deleteProducto      = id => api.delete(`/productos/${id}`);
// Categorías, Labs, Distribuidores (similares)
export const fetchCategorias     = () => api.get('/categorias');
export const fetchLaboratorios   = () => api.get('/laboratorios');
export const fetchDistribuidores = () => api.get('/distribuidores');

// Movimientos
export const createMovimiento      = data => api.post('/movimientos', data);
export const fetchMovimientos        = () => api.get('/movimientos');
export const fetchMovimientosByProd  = prodId => api.get(`/movimientos/producto/${prodId}`);
export const registerMovimiento      = data => api.post('/movimientos', data);

// Usuarios & Roles (más adelante, para administración) ---- Pendiente
export const fetchUsuarios       = () => api.get('/usuarios');
export const fetchRoles          = () => api.get('/roles');
export const createUsuario       = data => api.post('/usuarios', data);
