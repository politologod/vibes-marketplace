"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { Checkbox } from "@/components/atoms/checkbox"
import { Label } from "@/components/atoms/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/card"
import { InputField } from "@/components/molecules/input-field"
import { PasswordField } from "@/components/molecules/password-field"
import { Mail, User, Phone } from "lucide-react"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  isLoading?: boolean
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación básica
    const newErrors: Partial<RegisterFormData> = {}
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = true as any // Error flag
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario lo modifica
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="glass-effect border-secondary/20 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gradient">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Únete a nuestra comunidad y descubre productos increíbles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="firstName"
              label="Nombre"
              type="text"
              icon={User}
              placeholder="Tu nombre"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              error={errors.firstName}
              required
            />
            <InputField
              id="lastName"
              label="Apellido"
              type="text"
              icon={User}
              placeholder="Tu apellido"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          <InputField
            id="email"
            label="Correo Electrónico"
            type="email"
            icon={Mail}
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            required
          />

          <InputField
            id="phone"
            label="Teléfono"
            type="tel"
            icon={Phone}
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            error={errors.phone}
            required
          />

          <PasswordField
            id="password"
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            required
          />

          <PasswordField
            id="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            required
          />

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              Acepto los{" "}
              <Link 
                href="/terms" 
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                términos y condiciones
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">Debes aceptar los términos y condiciones</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:opacity-90 transition-all duration-300 neon-glow"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link 
              href="/login" 
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
