import { Router } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorCedula,
  actualizarUsuario,
  eliminarUsuario,
  actualizarCuentasBancarias,
  actualizarPagoMovil,
  verificarCorreoExiste,
  verificarCedulaExiste
} from '../controllers/user.controllers.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios del marketplace
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', crearUsuario);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Users]
 *     parameters:
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
 *         description: Usuarios por página
 *       - in: query
 *         name: busqueda
 *         schema:
 *           type: string
 *         description: Buscar por nombre, correo o cédula
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 */
router.get('/', obtenerUsuarios);

/**
 * @swagger
 * /api/users/verificar-correo/{correo}:
 *   get:
 *     summary: Verificar si un correo ya existe
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico a verificar
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 */
router.get('/verificar-correo/:correo', verificarCorreoExiste);

/**
 * @swagger
 * /api/users/verificar-cedula/{cedula}:
 *   get:
 *     summary: Verificar si una cédula ya existe
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula a verificar
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 */
router.get('/verificar-cedula/:cedula', verificarCedulaExiste);

/**
 * @swagger
 * /api/users/cedula/{cedula}:
 *   get:
 *     summary: Obtener usuario por cédula
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/cedula/:cedula', obtenerUsuarioPorCedula);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', obtenerUsuarioPorId);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', actualizarUsuario);

/**
 * @swagger
 * /api/users/{id}/cuentas-bancarias:
 *   put:
 *     summary: Actualizar cuentas bancarias del usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cuentasBancarias:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Cuentas bancarias actualizadas
 */
router.put('/:id/cuentas-bancarias', actualizarCuentasBancarias);

/**
 * @swagger
 * /api/users/{id}/pago-movil:
 *   put:
 *     summary: Actualizar información de pago móvil
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pago móvil actualizado
 */
router.put('/:id/pago-movil', actualizarPagoMovil);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', eliminarUsuario);

export default router;
