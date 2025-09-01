"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/organisms/profile-header"
import { ProfileSettings } from "@/components/organisms/profile-settings"
import { ProfileActivity } from "@/components/organisms/profile-activity"
import { ProductListing } from "@/components/organisms/product-listing"
import { Tabs } from "@/components/organisms/tabs"
import { useUserProfile } from "@/hooks/useUserProfile"
import { Card, CardContent } from "@/components/molecules/card"


const mockTransactions = [
  {
    id: 1,
    type: 'sale' as const,
    product: "iPhone 13 Pro",
    amount: "$800.00",
    date: "15 Mar 2024",
    status: 'completed' as const
  },
  {
    id: 2,
    type: 'purchase' as const,
    product: "Nike Air Max",
    amount: "$120.00", 
    date: "12 Mar 2024",
    status: 'completed' as const
  }
]

const mockFavorites = [
  {
    id: 1,
    title: "Samsung Galaxy S24",
    price: "$900.00",
    image: "/api/placeholder/150/150"
  },
  {
    id: 2,
    title: "Adidas Ultraboost",
    price: "$140.00",
    image: "/api/placeholder/150/150"
  }
]

const mockProducts = [
  {
    id: 1,
    title: "iPhone 14 Pro Max",
    description: "En excelente estado, con todos los accesorios originales.",
    price: "850.00",
    status: 'active' as const
  },
  {
    id: 2,
    title: "MacBook Air M2", 
    description: "Laptop perfecta para trabajo y estudio.",
    price: "1200.00",
    status: 'active' as const
  }
]

export default function ProfilePage() {
  const { user, loading, error, updateProfile } = useUserProfile()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleProfileSave = async (data: any) => {
    setIsUpdating(true)
    try {
      await updateProfile(data)
    } catch (err) {
      console.error("Error updating profile:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container py-8">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container py-8">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-red-500 text-lg">{error || 'No se pudo cargar el perfil'}</p>
                <p className="text-muted-foreground mt-2">
                  Por favor, inicia sesión para ver tu perfil.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const userHeaderData = {
    name: user.nombreCompleto,
    joinDate: new Date(user.fechaCreacion).toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    }),
    rating: 4.5, 
    reviewCount: 0, 
    verified: true,
    avatarUrl: user.foto || "/api/placeholder/150/150",
    stats: {
      totalSales: 0, 
      totalRevenue: "$0", 
      activeProducts: 0, 
      totalViews: "0" 
    }
  }

  const profileData = {
    firstName: user.nombreCompleto.split(' ')[0] || '',
    lastName: user.nombreCompleto.split(' ').slice(1).join(' ') || '',
    email: user.correo,
    phone: user.numeroTelefono || '',
    location: user.direccion || '',
    bio: '' 
  }

  const tabs = [
    {
      id: "overview",
      label: "Resumen",
      content: (
        <ProfileActivity
          transactions={mockTransactions}
          favorites={mockFavorites}
          recentViews={mockFavorites}
        />
      )
    },
    {
      id: "products", 
      label: "Mis Productos",
      content: (
        <ProductListing
          products={mockProducts}
          onEdit={(id) => console.log("Edit:", id)}
          onRemove={(id) => console.log("Remove:", id)}
          onToggleStatus={(id) => console.log("Toggle:", id)}
        />
      )
    },
    {
      id: "settings",
      label: "Configuración", 
      content: (
        <ProfileSettings
          initialData={profileData}
          onSave={handleProfileSave}
          isLoading={isUpdating}
        />
      )
    }
  ]

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            {...userHeaderData}
            onAvatarChange={() => console.log("Change avatar")}
          />
          <Tabs tabs={tabs} defaultTab="overview" variant="default" />
        </div>
      </div>
    </div>
  )
}
