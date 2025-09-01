"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { Checkbox } from "@/components/atoms/checkbox"
import { Label } from "@/components/atoms/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/card"
import { InputField } from "@/components/molecules/input-field"
import { PasswordField } from "@/components/molecules/password-field"
import { Mail } from "lucide-react"

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="glass-effect border-primary/20 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gradient">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            label="Correo Electrónico"
            type="email"
            icon={Mail}
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />

          <PasswordField
            id="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Recordarme
              </Label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gradient-primary hover:opacity-90 transition-all duration-300 neon-glow"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link 
              href="/register" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
