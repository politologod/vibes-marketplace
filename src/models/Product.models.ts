import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
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

const ProductSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  precio: {
    type: Number,
    required: true,
    min: 0.01
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  subcategoria: {
    type: String,
    trim: true
  },
  imagenes: [{
    type: String,
    required: true,
    trim: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  vendedorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'agotado'],
    default: 'activo'
  },
  condicion: {
    type: String,
    enum: ['nuevo', 'usado', 'reacondicionado'],
    required: true
  },
  especificaciones: {
    marca: {
      type: String,
      trim: true
    },
    modelo: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      trim: true
    },
    talla: {
      type: String,
      trim: true
    },
    peso: {
      type: Number,
      min: 0
    },
    dimensiones: {
      type: String,
      trim: true
    },
    material: {
      type: String,
      trim: true
    }
  },
  etiquetas: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
  fechaPublicacion: {
    type: Date
  },
  valoraciones: {
    promedio: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    cantidad: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  descuento: {
    porcentaje: {
      type: Number,
      min: 0,
      max: 100
    },
    fechaInicio: {
      type: Date
    },
    fechaFin: {
      type: Date
    }
  }
});

ProductSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  
  if (this.stock === 0) {
    this.estado = 'agotado';
  }
  
  next();
});

ProductSchema.virtual('precioConDescuento').get(function() {
  if (this.descuento && 
      this.descuento.fechaInicio <= new Date() && 
      this.descuento.fechaFin >= new Date()) {
    return this.precio * (1 - this.descuento.porcentaje / 100);
  }
  return this.precio;
});

ProductSchema.index({ nombre: 'text', descripcion: 'text', etiquetas: 'text' });
ProductSchema.index({ categoria: 1, subcategoria: 1 });
ProductSchema.index({ precio: 1 });
ProductSchema.index({ vendedorId: 1 });
ProductSchema.index({ estado: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
