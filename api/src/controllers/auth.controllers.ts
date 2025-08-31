import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.models.js';
import User from '../models/User.models.js';
import { type RegisterRequest, type LoginRequest } from '../types/Auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nombreCompleto, cedula, numeroTelefono, direccion }: RegisterRequest = req.body;

    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const existingUser = await User.findOne({ 
      $or: [{ correo: email }, { cedula }] 
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'La cédula o correo ya están registrados'
      });
    }

    const newUser = new User({
      correo: email,
      nombreCompleto,
      cedula,
      numeroTelefono,
      direccion,
      edad: 18
    });

    const savedUser = await newUser.save();

    const newAuth = new Auth({
      email,
      password,
      userId: savedUser._id
    });

    await newAuth.save();

    const token = jwt.sign(
      { 
        userId: savedUser._id,
        email: savedUser.correo,
        authId: newAuth._id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: savedUser._id,
        email: savedUser.correo,
        nombreCompleto: savedUser.nombreCompleto
      },
      message: 'Usuario registrado exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    const auth = await Auth.findOne({ email }).populate('userId');
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    if (!auth.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Cuenta desactivada'
      });
    }

    const isPasswordValid = await auth.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    auth.lastLogin = new Date();
    await auth.save();

    const user = auth.userId as any;

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.correo,
        authId: auth._id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.correo,
        nombreCompleto: user.nombreCompleto
      },
      message: 'Login exitoso'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.correo,
        nombreCompleto: user.nombreCompleto
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};