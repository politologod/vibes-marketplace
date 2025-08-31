import { Router } from 'express';
import { register, login, verifyToken } from '../controllers/auth.controllers.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Autenticación y manejo de sesiones
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nombreCompleto
 *               - cedula
 *               - numeroTelefono
 *               - direccion
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *               nombreCompleto:
 *                 type: string
 *                 example: "Juan Pérez"
 *               cedula:
 *                 type: string
 *                 example: "12345678"
 *               numeroTelefono:
 *                 type: string
 *                 example: "+58414-1234567"
 *               direccion:
 *                 type: string
 *                 example: "Caracas, Venezuela"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nombreCompleto:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en los datos o usuario ya existe
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticación
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nombreCompleto:
 *                       type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas o cuenta desactivada
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar token JWT
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Bearer token
 *         example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         description: Token alternativo
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nombreCompleto:
 *                       type: string
 *       401:
 *         description: Token inválido, expirado o no proporcionado
 */
router.get('/verify', verifyToken);

export default router;