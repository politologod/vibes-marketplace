import { Router } from 'express';
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware.js';
import { isProductOwner } from '../middleware/ownership.middleware.js';
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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos del marketplace
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: Token requerido
 */
router.post('/', authMiddleware, crearProducto);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener lista de productos con filtros (público)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar productos por nombre, descripción, categoría o etiquetas
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, name, fechaCreacion]
 *           default: fechaCreacion
 *         description: Campo para ordenar
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Dirección del ordenamiento
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Productos por página
 *       - in: query
 *         name: available
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtrar por disponibilidad
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedProducts'
 */
router.get('/', optionalAuth, obtenerProductos);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Búsqueda de productos con scoring (público)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Límite de resultados
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalResults:
 *                   type: number
 *       400:
 *         description: Parámetro de búsqueda requerido
 */
router.get('/search', optionalAuth, buscarProductos);

/**
 * @swagger
 * /api/products/categorias:
 *   get:
 *     summary: Obtener todas las categorías disponibles (público)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/categorias', obtenerCategorias);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID (público)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', optionalAuth, obtenerProductoPorId);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto (solo el dueño)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Sin permisos para modificar este producto
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', authMiddleware, isProductOwner, actualizarProducto);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto (solo el dueño)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Sin permisos para eliminar este producto
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', authMiddleware, isProductOwner, eliminarProducto);

export default router;