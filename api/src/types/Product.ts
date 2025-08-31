import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  subcategoria?: string;
  imagenes: string[];
  stock: number;
  vendedorId: mongoose.Types.ObjectId;
  estado: 'activo' | 'inactivo' | 'agotado';
  condicion: 'nuevo' | 'usado' | 'reacondicionado';
  especificaciones: {
    marca?: string;
    modelo?: string;
    color?: string;
    talla?: string;
    peso?: number;
    dimensiones?: string;
    material?: string;
  };
  etiquetas: string[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaPublicacion?: Date;
  valoraciones: {
    promedio: number;
    cantidad: number;
  };
  descuento?: {
    porcentaje: number;
    fechaInicio: Date;
    fechaFin: Date;
  };
}
