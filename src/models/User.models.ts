import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  cedula: string;
  correo: string;
  numeroTelefono: string;
  direccion: string;
  cuentasBancarias: {
    banco: string;
    numeroCuenta: string;
    tipoCuenta: 'ahorro' | 'corriente';
  }[];
  pagoMovil: {
    banco: string;
    telefono: string;
    cedula: string;
  };
  correoBinanceUSDT: string;
  foto?: string;
  nombreCompleto: string;
  edad: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

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
      required: true,
      trim: true
    },
    numeroCuenta: {
      type: String,
      required: true,
      trim: true
    },
    tipoCuenta: {
      type: String,
      enum: ['ahorro', 'corriente'],
      required: true
    }
  }],
  pagoMovil: {
    banco: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      required: true,
      trim: true
    },
    cedula: {
      type: String,
      required: true,
      trim: true
    }
  },
  correoBinanceUSDT: {
    type: String,
    required: true,
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
