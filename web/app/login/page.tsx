"use client"

import { AuthHeader } from "@/components/molecules/auth-header"
import { LoginForm } from "@/components/organisms/login-form"

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const handleLogin = (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log("Login attempt:", data)
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="w-full max-w-md">
        <AuthHeader
          title="¡Bienvenido de vuelta!"
          subtitle="Ingresa a tu cuenta para continuar descubriendo productos increíbles"
        />
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
