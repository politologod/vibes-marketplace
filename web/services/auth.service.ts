import { apiClient, ApiError } from './api-client'
import { LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from '@/types/api'

export class AuthService {
  
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials)
      
      if (response.success && response.token) {
        apiClient.setAuthToken(response.token, true)
      }
      
      return response
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || error.message || 'Error al iniciar sesión')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Mapear campos del frontend al backend
      const registerData = {
        email: userData.email,
        password: userData.password,
        nombreCompleto: userData.nombreCompleto,
        cedula: userData.cedula,
        numeroTelefono: userData.numeroTelefono,
        direccion: userData.direccion,
        edad: userData.edad
      }

      const response = await apiClient.post<AuthResponse>('/api/auth/register', registerData)
      
      if (response.success && response.token) {
        apiClient.setAuthToken(response.token, true)
      }
      
      return response
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || error.message || 'Error al registrarse')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Verificar token JWT actual
   */
  async verifyToken(): Promise<{ success: boolean; user?: User }> {
    try {
      if (!apiClient.hasAuthToken()) {
        return { success: false }
      }

      const response = await apiClient.get<ApiResponse<User>>('/api/auth/verify')
      
      return {
        success: response.success,
        user: response.data
      }
    } catch (error) {
      // Si el token es inválido, lo removemos
      if (error instanceof ApiError && error.isUnauthorized) {
        this.logout()
      }
      return { success: false }
    }
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    apiClient.removeAuthToken()
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return apiClient.hasAuthToken()
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    return apiClient.hasAuthToken() ? 'exists' : null
  }

  /**
   * Verificar si un email ya existe
   */
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const encodedEmail = encodeURIComponent(email)
      const response = await apiClient.get<ApiResponse<{ exists: boolean }>>(
        `/api/users/verificar-correo/${encodedEmail}`
      )
      return response.data?.exists || false
    } catch (error) {
      console.warn('Error verificando email:', error)
      return false
    }
  }

  /**
   * Verificar si una cédula ya existe
   */
  async checkCedulaExists(cedula: string): Promise<boolean> {
    try {
      const response = await apiClient.get<ApiResponse<{ exists: boolean }>>(
        `/api/users/verificar-cedula/${cedula}`
      )
      return response.data?.exists || false
    } catch (error) {
      console.warn('Error verificando cédula:', error)
      return false
    }
  }
}

// Instancia singleton del servicio de autenticación
export const authService = new AuthService()
