import mongoose, { Schema, Document } from 'mongoose';
import { type IUser } from '../types/User.js';
const UserSchema: Schema = new Schema({
  cedula: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  numeroTelefono: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  cuentasBancarias: [{
    banco: {
      type: String,
      required: false,
      trim: true
    },
    numeroCuenta: {
      type: String,
      required: false,
      trim: true
    },
    tipoCuenta: {
      type: String,
      enum: ['ahorro', 'corriente'],
      required: false
    }
  }],
  pagoMovil: {
    banco: {
      type: String,
      required: false,
      trim: true
    },
    telefono: {
      type: String,
      required: false,
      trim: true
    },
    cedula: {
      type: String,
      required: false,
      trim: true
    }
  },
  correoBinanceUSDT: {
    type: String,
    required: false,
    lowercase: true,
    trim: true
  },
  foto: {
    type: String,
    trim: true
  },
  nombreCompleto: {
    type: String,
    required: true,
    trim: true
  },
  edad: {
    type: Number,
    required: true,
    min: 18,
    max: 120
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export default mongoose.model<IUser>('User', UserSchema);
