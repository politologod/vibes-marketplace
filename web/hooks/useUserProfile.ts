import { useState, useEffect } from 'react'
import { usersService } from '@/services'
import { User } from '@/types/api'

interface UseUserProfileResult {
  user: User | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
}

export function useUserProfile(): UseUserProfileResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await usersService.getCurrentUserProfile()
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar perfil')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) {
      throw new Error('No hay usuario para actualizar')
    }

    try {
      setLoading(true)
      setError(null)
      const updatedUser = await usersService.updateUserProfile(user._id, userData)
      setUser(updatedUser)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil')
      throw err 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    user,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile
  }
}
