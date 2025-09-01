import { apiClient, ApiError } from './api-client'
import { User, BankAccount, MobilePayment, ApiResponse } from '@/types/api'

export interface UpdateUserRequest {
  cedula?: string
  correo?: string
  numeroTelefono?: string
  direccion?: string
  nombreCompleto?: string
  edad?: number
  correoBinanceUSDT?: string
  foto?: string
}

export interface UsersListResponse {
  success: boolean
  data: User[]
  pagination: {
    currentPage: number
    totalPages: number
    totalUsers: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export class UsersService {

  /**
   * Obtener lista de usuarios (requiere autenticación)
   */
  async getUsers(page: number = 1, limit: number = 10, busqueda?: string): Promise<UsersListResponse> {
    try {
      const searchParams = new URLSearchParams({
        page: String(page),
        limit: String(limit)
      })

      if (busqueda) {
        searchParams.append('busqueda', busqueda)
      }

      return await apiClient.get<UsersListResponse>(`/api/users?${searchParams.toString()}`)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para acceder a esta información')
        }
        throw new Error(error.data?.message || 'Error al obtener usuarios')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/api/users/${id}`)
      
      if (!response.success || !response.data) {
        throw new Error('Usuario no encontrado')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para acceder a esta información')
        }
        if (error.isNotFound) {
          throw new Error('Usuario no encontrado')
        }
        throw new Error(error.data?.message || 'Error al obtener usuario')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener usuario por cédula
   */
  async getUserByCedula(cedula: string): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/api/users/cedula/${cedula}`)
      
      if (!response.success || !response.data) {
        throw new Error('Usuario no encontrado')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para acceder a esta información')
        }
        if (error.isNotFound) {
          throw new Error('Usuario no encontrado')
        }
        throw new Error(error.data?.message || 'Error al obtener usuario')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Actualizar usuario (solo el propio usuario)
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(`/api/users/${id}`, userData)
      
      if (!response.success || !response.data) {
        throw new Error('Error al actualizar usuario')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para actualizar tu perfil')
        }
        if (error.isForbidden) {
          throw new Error('Solo puedes modificar tu propia información')
        }
        if (error.isNotFound) {
          throw new Error('Usuario no encontrado')
        }
        throw new Error(error.data?.message || 'Error al actualizar usuario')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Eliminar usuario (solo el propio usuario)
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse>(`/api/users/${id}`)
      
      if (!response.success) {
        throw new Error('Error al eliminar usuario')
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para eliminar tu cuenta')
        }
        if (error.isForbidden) {
          throw new Error('Solo puedes eliminar tu propia cuenta')
        }
        if (error.isNotFound) {
          throw new Error('Usuario no encontrado')
        }
        throw new Error(error.data?.message || 'Error al eliminar usuario')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Actualizar cuentas bancarias del usuario
   */
  async updateBankAccounts(id: string, cuentasBancarias: BankAccount[]): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        `/api/users/${id}/cuentas-bancarias`,
        { cuentasBancarias }
      )
      
      if (!response.success || !response.data) {
        throw new Error('Error al actualizar cuentas bancarias')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para actualizar tus cuentas bancarias')
        }
        if (error.isForbidden) {
          throw new Error('Solo puedes modificar tu propia información bancaria')
        }
        throw new Error(error.data?.message || 'Error al actualizar cuentas bancarias')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Actualizar información de pago móvil
   */
  async updateMobilePayment(id: string, pagoMovil: MobilePayment): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        `/api/users/${id}/pago-movil`,
        { pagoMovil }
      )
      
      if (!response.success || !response.data) {
        throw new Error('Error al actualizar pago móvil')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para actualizar tu pago móvil')
        }
        if (error.isForbidden) {
          throw new Error('Solo puedes modificar tu propia información de pago')
        }
        throw new Error(error.data?.message || 'Error al actualizar pago móvil')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Verificar si un email ya existe (público)
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
   * Verificar si una cédula ya existe (público)
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

// Instancia singleton del servicio de usuarios
export const usersService = new UsersService()
