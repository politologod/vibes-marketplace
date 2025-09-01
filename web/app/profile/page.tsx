"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/organisms/profile-header"
import { ProfileSettings } from "@/components/organisms/profile-settings"
import { ProfileActivity } from "@/components/organisms/profile-activity"
import { ProductListing } from "@/components/organisms/product-listing"
import { Tabs } from "@/components/organisms/tabs"

const mockUserData = {
  name: "Juan Pérez",
  joinDate: "Diciembre 2023",
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  avatarUrl: "/api/placeholder/150/150",
  stats: {
    totalSales: 47,
    totalRevenue: "$12,450",
    activeProducts: 23,
    totalViews: "8.7k"
  }
}

const mockProfileData = {
  firstName: "Juan",
  lastName: "Pérez", 
  email: "juan.perez@email.com",
  phone: "+58 412 123 4567",
  location: "Caracas, Venezuela",
  bio: "Vendedor apasionado de productos de tecnología y moda."
}

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
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileSave = async (data: any) => {
    setIsLoading(true)
    try {
      console.log("Saving profile:", data)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setIsLoading(false)
    }
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
          initialData={mockProfileData}
          onSave={handleProfileSave}
          isLoading={isLoading}
        />
      )
    }
  ]

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            {...mockUserData}
            onAvatarChange={() => console.log("Change avatar")}
          />
          <Tabs tabs={tabs} defaultTab="overview" variant="default" />
        </div>
      </div>
    </div>
  )
}
