export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalProducts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ApiFilters {
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
  available?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo
  filters: ApiFilters
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  nombreCompleto: string
  cedula: string
  numeroTelefono: string
  direccion: string
  edad?: number
}

export interface AuthResponse {
  success: boolean
  token: string
  user: {
    id: string
    email: string
    nombreCompleto: string
  }
  message?: string
}

export interface User {
  _id: string
  cedula: string
  correo: string
  numeroTelefono: string
  direccion: string
  nombreCompleto: string
  edad: number
  cuentasBancarias?: BankAccount[]
  pagoMovil?: MobilePayment
  correoBinanceUSDT?: string
  foto?: string
  fechaCreacion: string
  fechaActualizacion: string
}

export interface BankAccount {
  banco: string
  numeroCuenta: string
  tipoCuenta: 'ahorro' | 'corriente'
}

export interface MobilePayment {
  banco: string
  telefono: string
  cedula: string
}

export interface Product {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  subcategoria?: string
  imagenes: string[]
  stock: number
  vendedorId: string
  estado: 'activo' | 'inactivo' | 'agotado'
  condicion: 'nuevo' | 'usado' | 'reacondicionado'
  especificaciones?: ProductSpecifications
  etiquetas?: string[]
  valoraciones?: ProductRating
  descuento?: ProductDiscount
  fechaCreacion: string
  fechaActualizacion: string
}

export interface ProductSpecifications {
  marca?: string
  modelo?: string
  color?: string
  talla?: string
  peso?: number
  dimensiones?: string
  material?: string
}

export interface ProductRating {
  promedio: number
  cantidad: number
}

export interface ProductDiscount {
  porcentaje: number
  fechaInicio: string
  fechaFin: string
}

export interface ProductSimple {
  id: string
  name: string
  price: number
  isAvailable: boolean
  category: string
  image: string
  description?: string
  stock?: number
}

export interface CreateProductRequest {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  subcategoria?: string
  stock: number
  condicion: 'nuevo' | 'usado' | 'reacondicionado'
  especificaciones?: ProductSpecifications
  etiquetas?: string[]
}

export interface ProductSearchParams {
  q?: string
  categoria?: string
  search?: string
  sort?: 'price' | 'name' | 'fechaCreacion'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
  available?: boolean
}

export interface UploadImageResponse {
  success: boolean
  data: {
    imageUrl: string
    producto: Product
  }
  message: string
}

export interface UploadImagesResponse {
  success: boolean
  data: {
    imageUrls: string[]
    producto: Product
  }
  message: string
}
