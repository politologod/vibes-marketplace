"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Select } from "@/components/molecules/select"
import { InputField } from "@/components/molecules/input-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { Upload, DollarSign } from "lucide-react"

interface ProductFormData {
  name: string
  description: string
  category: string
  price: string
  images: File[]
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  isLoading?: boolean
}

const categories = [
  { value: "clothing", label: "Ropa" },
  { value: "footwear", label: "Calzado" },
  { value: "technology", label: "Tecnología" },
  { value: "food", label: "Comida y Bebidas" },
  { value: "hygiene", label: "Higiene y Belleza" },
  { value: "motorcycles", label: "Motocicletas" },
  { value: "accessories", label: "Accesorios" }
]

export function ProductForm({ onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    price: "",
    images: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: files }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publicar Nuevo Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="productName"
            label="Nombre del Producto"
            placeholder="Ingresa el nombre del producto"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea
              placeholder="Describe las características, condición y especificaciones del producto..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoría</label>
            <Select
              options={categories}
              placeholder="Seleccionar categoría"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
            />
          </div>

          <InputField
            id="price"
            label="Precio (USD)"
            type="number"
            icon={DollarSign}
            placeholder="0.00"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Subir Imágenes del Producto</label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Arrastra y suelta las imágenes aquí, o haz clic para buscar
              </p>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="max-w-xs"
              />
              {formData.images.length > 0 && (
                <p className="text-sm text-primary mt-2">
                  {formData.images.length} imagen(es) seleccionada(s)
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Publicando..." : "Publicar Producto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
