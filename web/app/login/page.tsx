"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthHeader } from "@/components/molecules/auth-header"
import { LoginForm } from "@/components/organisms/login-form"
import { useAuth } from "@/context"

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await login(data.email, data.password)
      
      router.push('/')
    } catch (error) {
      console.error("Error en login:", error)
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="w-full max-w-md">
        <AuthHeader
          title="¡Bienvenido de vuelta!"
          subtitle="Ingresa a tu cuenta para continuar descubriendo productos increíbles"
        />
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  )
}
