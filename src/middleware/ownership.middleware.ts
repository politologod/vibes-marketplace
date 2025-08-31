import { type Response } from 'express';
import { type AuthRequest } from './auth.middleware.js';
import Product from '../models/Product.models.js';

type NextFunction = (err?: any) => void;

export const isProductOwner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (product.vendedorId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para modificar este producto'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verificando permisos'
    });
  }
};

export const isUserOwner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Solo puedes modificar tu propia información'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verificando permisos'
    });
  }
};