import { Document } from 'mongoose';

export interface IAuth extends Document {
  email: string;
  password: string;
  userId: string;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombreCompleto: string;
  cedula: string;
  numeroTelefono: string;
  direccion: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    nombreCompleto: string;
  };
  message: string;
}