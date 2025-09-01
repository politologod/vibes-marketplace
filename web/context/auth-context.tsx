"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '@/services'
import { User } from '@/types/api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  cedula: string
  direccion: string
  password: string
  edad?: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const result = await authService.verifyToken()
        if (result.success && result.user) {
          setUser(result.user)
          setIsAuthenticated(true)
        } else {
          authService.logout()
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      authService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      
      if (response.success && response.user) {
        const userData: User = {
          _id: response.user.id,
          cedula: '', 
          correo: response.user.email,
          numeroTelefono: '',
          direccion: '',
          nombreCompleto: response.user.nombreCompleto,
          edad: 0,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString()
        }
        
        setUser(userData)
        setIsAuthenticated(true)
        
        await refreshUser()
      }
    } catch (error) {
      throw error 
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const registerRequest = {
        email: userData.email,
        password: userData.password,
        nombreCompleto: `${userData.firstName} ${userData.lastName}`,
        cedula: userData.cedula,
        numeroTelefono: userData.phone,
        direccion: userData.direccion,
        edad: userData.edad
      }

      const response = await authService.register(registerRequest)
      
      if (response.success && response.user) {
        const newUser: User = {
          _id: response.user.id,
          cedula: registerRequest.cedula,
          correo: response.user.email,
          numeroTelefono: registerRequest.numeroTelefono,
          direccion: registerRequest.direccion,
          nombreCompleto: response.user.nombreCompleto,
          edad: registerRequest.edad || 0,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString()
        }
        
        setUser(newUser)
        setIsAuthenticated(true)
      }
    } catch (error) {
      throw error 
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const refreshUser = async () => {
    try {
      const result = await authService.verifyToken()
      if (result.success && result.user) {
        setUser(result.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error refrescando usuario:', error)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
