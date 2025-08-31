import multer from 'multer';
import { type Request, type Response } from 'express';
import cloudinary from '../configs/cloudinary.js';

type NextFunction = (err?: any) => void;

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next();
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'vibes-marketplace/products',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { format: 'webp' }
      ]
    });

    (req as any).cloudinaryUrl = result.secure_url;
    (req as any).cloudinaryPublicId = result.public_id;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir imagen',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const uploadMultipleToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next();
    }

    const uploadPromises = req.files.map(async (file: Express.Multer.File) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'vibes-marketplace/products',
        resource_type: 'image',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      });

      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    (req as any).cloudinaryUrls = uploadResults.map(result => result.url);
    (req as any).cloudinaryPublicIds = uploadResults.map(result => result.publicId);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir imágenes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error al eliminar imagen de Cloudinary:', error);
  }
};

