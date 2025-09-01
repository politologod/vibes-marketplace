"use client"

import { AuthHeader } from "@/components/molecules/auth-header"
import { RegisterForm } from "@/components/organisms/register-form"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const handleRegister = (data: RegisterFormData) => {
    // TODO: Implement registration logic
    console.log("Registration attempt:", data)
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-secondary/5">
      <div className="w-full max-w-md">
        <AuthHeader
          title="¡Únete a nosotros!"
          subtitle="Crea tu cuenta y comienza a descubrir productos increíbles"
        />
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  )
}
