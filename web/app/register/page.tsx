"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthHeader } from "@/components/molecules/auth-header"
import { RegisterForm } from "@/components/organisms/register-form"
import { useAuth } from "@/context"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  cedula: string
  direccion: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register } = useAuth()
  const router = useRouter()

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        cedula: data.cedula,
        direccion: data.direccion,
        password: data.password
      })
      
      router.push('/') 
    } catch (error) {
      console.error("Error en registro:", error)
      setError(error instanceof Error ? error.message : 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-secondary/5">
      <div className="w-full max-w-md">
        <AuthHeader
          title="¡Únete a nosotros!"
          subtitle="Crea tu cuenta y comienza a descubrir productos increíbles"
        />
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  )
}
