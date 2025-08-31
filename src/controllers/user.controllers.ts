import { type Request, type Response } from 'express';
import User from '../models/User.models.js';

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = new User(req.body);
    await usuario.save();
    res.status(201).json({
      success: true,
      data: usuario,
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return res.status(400).json({
        success: false,
        message: 'La cédula o correo ya están registrados',
        error: 'Datos duplicados'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error al crear el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, busqueda } = req.query;

    const filtros: any = {};

    if (busqueda) {
      filtros.$or = [
        { nombreCompleto: { $regex: busqueda, $options: 'i' } },
        { correo: { $regex: busqueda, $options: 'i' } },
        { cedula: { $regex: busqueda, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const usuarios = await User
      .find(filtros)
      .select('-__v')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filtros);

    res.json({
      success: true,
      data: usuarios,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalUsers: total,
        hasNextPage: skip + Number(limit) < total,
        hasPrevPage: Number(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await User.findById(id).select('-__v');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerUsuarioPorCedula = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.params;
    const usuario = await User.findOne({ cedula }).select('-__v');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByIdAndUpdate(
      id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return res.status(400).json({
        success: false,
        message: 'La cédula o correo ya están registrados',
        error: 'Datos duplicados'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const actualizarCuentasBancarias = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cuentasBancarias } = req.body;

    const usuario = await User.findByIdAndUpdate(
      id,
      { 
        cuentasBancarias,
        fechaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario,
      message: 'Cuentas bancarias actualizadas exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar las cuentas bancarias',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const actualizarPagoMovil = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pagoMovil } = req.body;

    const usuario = await User.findByIdAndUpdate(
      id,
      { 
        pagoMovil,
        fechaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario,
      message: 'Pago móvil actualizado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el pago móvil',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const verificarCorreoExiste = async (req: Request, res: Response) => {
  try {
    const { correo } = req.params;
    const usuario = await User.findOne({ correo });

    res.json({
      success: true,
      existe: !!usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar el correo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const verificarCedulaExiste = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.params;
    const usuario = await User.findOne({ cedula });

    res.json({
      success: true,
      existe: !!usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar la cédula',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
