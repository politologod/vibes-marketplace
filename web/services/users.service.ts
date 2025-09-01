import { apiClient, ApiError } from './api-client'
import { User, ApiResponse } from '@/types/api'

export class UsersService {
  

  async getCurrentUserProfile(): Promise<User> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        user: { id: string; email: string; nombreCompleto: string }
      }>('/api/auth/verify')
      
      if (!response.success || !response.user) {
        throw new Error('No se pudo obtener el perfil del usuario')
      }
      
      const fullProfile = await this.getUserById(response.user.id)
      return fullProfile
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Sesión expirada. Inicia sesión nuevamente.')
        }
        throw new Error(error.data?.message || 'Error al obtener perfil')
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
        if (error.isNotFound) {
          throw new Error('Usuario no encontrado')
        }
        if (error.isUnauthorized) {
          throw new Error('No tienes permisos para ver este perfil')
        }
        throw new Error(error.data?.message || 'Error al obtener usuario')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   */
  async updateUserProfile(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(`/api/users/${userId}`, userData)
      
      if (!response.success || !response.data) {
        throw new Error('Error al actualizar perfil')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Sesión expirada. Inicia sesión nuevamente.')
        }
        if (error.isForbidden) {
          throw new Error('No tienes permisos para modificar este perfil')
        }
        throw new Error(error.data?.message || 'Error al actualizar perfil')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   */
  async getUserProducts(userId: string): Promise<any[]> {
    try {
      const response = await apiClient.get<ApiResponse<any[]>>(`/api/products?vendedor=${userId}`)
      
      if (!response.success) {
        throw new Error('Error al obtener productos')
      }
      
      return response.data || []
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || 'Error al obtener productos')
      }
      throw new Error('Error de conexión al servidor')
    }
  }
}

// Instancia singleton del servicio de usuarios
export const usersService = new UsersService()