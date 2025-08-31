import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isUserOwner } from '../middleware/ownership.middleware.js';
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
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 */
router.post('/', authMiddleware, crearUsuario);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener lista de usuarios (protegido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 */
router.get('/', authMiddleware, obtenerUsuarios);

/**
 * @swagger
 * /api/users/verificar-correo/{correo}:
 *   get:
 *     summary: Verificar si un correo ya existe (público)
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
 *     summary: Verificar si una cédula ya existe (público)
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
 *     summary: Obtener usuario por cédula (protegido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/cedula/:cedula', authMiddleware, obtenerUsuarioPorCedula);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID (protegido)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authMiddleware, obtenerUsuarioPorId);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario (solo el propio usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Solo puedes modificar tu propia información
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', authMiddleware, isUserOwner, actualizarUsuario);

/**
 * @swagger
 * /api/users/{id}/cuentas-bancarias:
 *   put:
 *     summary: Actualizar cuentas bancarias del usuario (solo el propio usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Solo puedes modificar tu propia información
 */
router.put('/:id/cuentas-bancarias', authMiddleware, isUserOwner, actualizarCuentasBancarias);

/**
 * @swagger
 * /api/users/{id}/pago-movil:
 *   put:
 *     summary: Actualizar información de pago móvil (solo el propio usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pago móvil actualizado
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Solo puedes modificar tu propia información
 */
router.put('/:id/pago-movil', authMiddleware, isUserOwner, actualizarPagoMovil);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario (solo el propio usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token requerido
 *       403:
 *         description: Solo puedes eliminar tu propia cuenta
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authMiddleware, isUserOwner, eliminarUsuario);

export default router;