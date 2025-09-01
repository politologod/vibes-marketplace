"use client"

import { useState, useEffect } from "react"
import { FilterSidebar } from "@/components/organisms/filter-sidebar"
import { ProductGrid } from "@/components/molecules/product-grid"
import { productsService } from "@/services"
import { ProductSimple } from "@/types/api"

export default function BrowsePage() {
  const [products, setProducts] = useState<ProductSimple[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        page: 1,
        limit: 50,
        available: true,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== "all" && { categoria: selectedCategory })
      }
      
      const data = await productsService.getProductsSimple(params)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [searchQuery, selectedCategory])

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesLocation = selectedLocation === "all" || true
    
    return matchesPrice && matchesLocation
  })

  const handleClearFilters = () => {
    setPriceRange([0, 1500])
    setSelectedCategory("all")
    setSelectedLocation("all")
    setSearchQuery("")
  }

  return (
    <div className="container py-8">
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

                      {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <button 
                  onClick={loadProducts}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} loading={loading} />
            )}
        </div>
      </div>
    </div>
  )
}