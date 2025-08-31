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

router.post('/', crearUsuario);

router.get('/', obtenerUsuarios);

router.get('/verificar-correo/:correo', verificarCorreoExiste);

router.get('/verificar-cedula/:cedula', verificarCedulaExiste);

router.get('/cedula/:cedula', obtenerUsuarioPorCedula);

router.get('/:id', obtenerUsuarioPorId);

router.put('/:id', actualizarUsuario);

router.put('/:id/cuentas-bancarias', actualizarCuentasBancarias);

router.put('/:id/pago-movil', actualizarPagoMovil);

router.delete('/:id', eliminarUsuario);

export default router;
