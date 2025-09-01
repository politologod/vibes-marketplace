"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { InputField } from "@/components/molecules/input-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { User, Mail, Phone, MapPin, Lock, Save } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
}

interface ProfileSettingsProps {
  initialData: ProfileData
  onSave: (data: ProfileData) => void
  isLoading?: boolean
}

export function ProfileSettings({ initialData, onSave, isLoading = false }: ProfileSettingsProps) {
  const [formData, setFormData] = useState<ProfileData>(initialData)
  const [activeSection, setActiveSection] = useState("personal")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const sections = [
    { id: "personal", label: "Información Personal" },
    { id: "contact", label: "Contacto" },
    { id: "security", label: "Seguridad" }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuración</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                    activeSection === section.id ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit}>
          {activeSection === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="firstName"
                    label="Nombre"
                    icon={User}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                  <InputField
                    id="lastName"
                    label="Apellido"
                    icon={User}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>

                <InputField
                  id="location"
                  label="Ubicación"
                  icon={MapPin}
                  placeholder="Ciudad, País"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Biografía</label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    rows={4}
                    placeholder="Cuéntanos un poco sobre ti..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "contact" && (
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InputField
                  id="email"
                  label="Correo Electrónico"
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />

                <InputField
                  id="phone"
                  label="Teléfono"
                  type="tel"
                  icon={Phone}
                  placeholder="+58 412 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                  <InputField
                    id="currentPassword"
                    label="Contraseña Actual"
                    type="password"
                    icon={Lock}
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <InputField
                    id="newPassword"
                    label="Nueva Contraseña"
                    type="password"
                    icon={Lock}
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <InputField
                    id="confirmPassword"
                    label="Confirmar Contraseña"
                    type="password"
                    icon={Lock}
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Actualizar Contraseña
                </Button>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
