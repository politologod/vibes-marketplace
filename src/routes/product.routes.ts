import { Router } from 'express';
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  buscarProductos,
  obtenerCategorias
} from '../controllers/product.controllers.js';

const router = Router();

router.post('/', crearProducto);

router.get('/', obtenerProductos);

router.get('/search', buscarProductos);

router.get('/categorias', obtenerCategorias);

router.get('/:id', obtenerProductoPorId);

router.put('/:id', actualizarProducto);

router.delete('/:id', eliminarProducto);

export default router;
