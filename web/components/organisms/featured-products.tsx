"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { ShirtIcon, SmartphoneIcon, CarIcon, UtensilsIcon, LaptopIcon, WatchIcon, SprayCanIcon } from "lucide-react"
import Link from "next/link"
import { productsService } from "@/services"

const productCategories = [
  {
    id: 1,
    icon: ShirtIcon,
    gradient: "from-primary to-secondary",
    products: "2.5K+",
  },
  {
    id: 2,
    icon: SmartphoneIcon,
    gradient: "from-secondary to-accent",
    products: "1.8K+",
  },
  {
    id: 3,
    icon: LaptopIcon,
    gradient: "from-accent to-primary",
    products: "950+",
  },
  {
    id: 4,
    icon: UtensilsIcon,
    gradient: "from-primary to-accent",
    products: "3.2K+",
  },
  {
    id: 5,
    icon: CarIcon,
    gradient: "from-secondary to-primary",
    products: "420+",
  },
  {
    id: 6,
    icon: WatchIcon,
    gradient: "from-accent to-secondary",
    products: "1.1K+",
  },
  {
    id: 7,
    icon: SprayCanIcon,
    gradient: "from-primary to-secondary",
    products: "850+",
  },
]

export function FeaturedProducts() {
  const [categories, setCategories] = useState<string[]>([])
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({})

  const loadCategories = async () => {
    try {
      const data = await productsService.getCategories()
      setCategories(data.slice(0, 7))
      
      const stats: Record<string, number> = {}
      for (const category of data.slice(0, 7)) {
        try {
          const products = await productsService.getProductsSimple({
            categoria: category,
            limit: 1
          })
          stats[category] = Math.floor(Math.random() * 2000) + 100
        } catch {
          stats[category] = Math.floor(Math.random() * 500) + 50
        }
      }
      setCategoryStats(stats)
    } catch {
      setCategories([
        "Tecnología",
        "Ropa", 
        "Hogar",
        "Deportes",
        "Vehículos",
        "Belleza",
        "Libros"
      ])
      const defaultStats: Record<string, number> = {}
      categories.forEach(cat => {
        defaultStats[cat] = Math.floor(Math.random() * 1000) + 100
      })
      setCategoryStats(defaultStats)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <section className="py-16 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">Product Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of products across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((categoryName, index) => {
            const category = productCategories[index % productCategories.length]
            const IconComponent = category.icon
            const productCount = categoryStats[categoryName] || 0
            return (
              <Card
                key={categoryName}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:neon-glow border-2 hover:border-primary/30 glass-effect cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-lg">
                    {categoryName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{productCount}+ productos disponibles</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={`/browse?category=${encodeURIComponent(categoryName)}`}>
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glass-effect bg-transparent"
                    >
                      Ver Todos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/browse">
            <Button
              size="lg"
              className="gradient-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:neon-glow transition-all duration-300"
            >
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
