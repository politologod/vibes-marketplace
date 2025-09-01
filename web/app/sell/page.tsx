"use client"

import { useState } from "react"
import { ProductForm } from "@/components/organisms/product-form"
import { ProductListing } from "@/components/organisms/product-listing"
import { Tabs } from "@/components/organisms/tabs"

const mockProducts = [
  {
    id: 1,
    title: "Nike Air Max 270",
    description: "Zapatillas deportivas cómodas con tecnología de amortiguación avanzada y parte superior de malla transpirable.",
    price: "120.00",
    status: 'active' as const,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "Granos de Café Orgánico",
    description: "Granos de café premium de origen único de las montañas colombianas, tueste medio.",
    price: "15.00",
    status: 'sold' as const,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Chaqueta de Cuero Vintage",
    description: "Chaqueta de cuero auténtico en excelente estado, estilo clásico atemporal.",
    price: "85.00",
    status: 'paused' as const,
    image: "/api/placeholder/300/200"
  }
]

interface ProductFormData {
  name: string
  description: string
  category: string
  price: string
  images: File[]
}

export default function SellPage() {
  const [products, setProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(false)

  const handleProductSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    
    try {
      console.log("Creating product:", data)
      
      const newProduct = {
        id: Date.now(),
        title: data.name,
        description: data.description,
        price: data.price,
        status: 'active' as const,
        image: "/api/placeholder/300/200"
      }
      
      setProducts(prev => [newProduct, ...prev])
      
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (productId: number) => {
    console.log("Edit product:", productId)
  }

  const handleRemove = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  const handleToggleStatus = (productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'paused' : 'active' as const }
        : p
    ))
  }

  const tabs = [
    {
      id: "new",
      label: "Nuevo Producto",
      content: (
        <ProductForm
          onSubmit={handleProductSubmit}
          isLoading={isLoading}
        />
      )
    },
    {
      id: "listings",
      label: "Mis Publicaciones",
      content: (
        <ProductListing
          products={products}
          onEdit={handleEdit}
          onRemove={handleRemove}
          onToggleStatus={handleToggleStatus}
        />
      )
    }
  ]

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Vender Productos
          </h1>
          <p className="text-muted-foreground">
            Publica tus productos y llega a miles de compradores
          </p>
        </div>

        <Tabs
          tabs={tabs}
          defaultTab="new"
          variant="default"
        />
      </div>
    </div>
  )
}