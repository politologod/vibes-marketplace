"use client"

import { useState } from "react"
import { Navigation } from "@/components/organisms/navigation"
import { Footer } from "@/components/organisms/footer"
import { FilterSidebar } from "@/components/organisms/filter-sidebar"
import { ProductGrid } from "@/components/molecules/product-grid"

const products = [
  {
    id: 1,
    title: "Nike Air Max 270",
    description: "Zapatillas deportivas cómodas con tecnología de amortiguación avanzada y parte superior de malla transpirable.",
    price: 120,
    category: "footwear",
    rating: 4.8,
    seller: "SneakerHub.eth",
    location: "Caracas",
    verified: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "iPhone 13 Pro",
    description: "Smartphone Apple con pantalla Super Retina XDR de 6.1 pulgadas, chip A15 Bionic y sistema de cámara Pro.",
    price: 800,
    category: "technology",
    rating: 4.9,
    seller: "TechStore.eth",
    location: "Valencia",
    verified: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Chaqueta de Cuero",
    description: "Chaqueta de cuero genuino, perfecta para el invierno. Diseño clásico y duradero.",
    price: 85,
    category: "clothing",
    rating: 4.6,
    seller: "FashionCorp.eth",
    location: "Maracaibo",
    verified: false,
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    title: "MacBook Air M2",
    description: "Laptop Apple con chip M2, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.",
    price: 1200,
    category: "technology",
    rating: 4.9,
    seller: "AppleStore.eth",
    location: "Caracas",
    verified: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    title: "Adidas Ultraboost 22",
    description: "Zapatillas de running con tecnología BOOST para máximo retorno de energía.",
    price: 140,
    category: "footwear",
    rating: 4.7,
    seller: "SportZone.eth",
    location: "Barquisimeto",
    verified: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 6,
    title: "Camiseta Vintage",
    description: "Camiseta de algodón 100% con diseño vintage. Cómoda y estilosa.",
    price: 25,
    category: "clothing",
    rating: 4.4,
    seller: "VintageShop.eth",
    location: "Barcelona",
    verified: false,
    image: "/api/placeholder/300/200"
  }
]

export default function BrowsePage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || product.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesSearch = searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPrice && matchesCategory && matchesLocation && matchesSearch
  })

  const handleClearFilters = () => {
    setPriceRange([0, 1500])
    setSelectedCategory("all")
    setSelectedLocation("all")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              category={selectedCategory}
              onCategoryChange={setSelectedCategory}
              location={selectedLocation}
              onLocationChange={setSelectedLocation}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Explorar Productos
              </h1>
              <p className="text-muted-foreground">
                Encontramos {filteredProducts.length} productos que coinciden con tu búsqueda
              </p>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}