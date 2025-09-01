"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Select } from "@/components/molecules/select"
import { InputField } from "@/components/molecules/input-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { Upload, DollarSign } from "lucide-react"
import { productsService } from "@/services"
import { CreateProductRequest } from "@/types/api"

interface ProductFormData {
  name: string
  description: string
  category: string
  price: string
  stock: string
  condition: string
  images: File[]
}

interface ProductFormProps {
  onSubmit: (data: CreateProductRequest, images: File[]) => void
  isLoading?: boolean
}

const conditions = [
  { value: "nuevo", label: "Nuevo" },
  { value: "usado", label: "Usado" },
  { value: "reacondicionado", label: "Reacondicionado" }
]

export function ProductForm({ onSubmit, isLoading = false }: ProductFormProps) {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([])
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "1",
    condition: "nuevo",
    images: []
  })

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await productsService.getCategories()
        setCategories(data.map(cat => ({ value: cat, label: cat })))
      } catch {
        setCategories([
          { value: "Tecnología", label: "Tecnología" },
          { value: "Ropa", label: "Ropa" },
          { value: "Hogar", label: "Hogar" },
          { value: "Deportes", label: "Deportes" },
          { value: "Vehículos", label: "Vehículos" },
          { value: "Belleza", label: "Belleza" },
          { value: "Libros", label: "Libros" }
        ])
      }
    }
    loadCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData: CreateProductRequest = {
      nombre: formData.name,
      descripcion: formData.description,
      precio: parseFloat(formData.price),
      categoria: formData.category,
      stock: parseInt(formData.stock),
      condicion: formData.condition as "nuevo" | "usado" | "reacondicionado"
    }
    
    onSubmit(productData, formData.images)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <InputField
              id="stock"
              label="Cantidad en Stock"
              type="number"
              placeholder="1"
              min="1"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Condición</label>
            <Select
              options={conditions}
              placeholder="Seleccionar condición"
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              required
            />
          </div>

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
