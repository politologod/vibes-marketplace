import { Document } from 'mongoose';

export interface IUser extends Document {
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
