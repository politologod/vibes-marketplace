import { ProductCard } from "@/components/organisms/product-card"
import { cn } from "@/utils"
import { ProductSimple } from "@/types/api"

interface ProductGridProps {
  products: ProductSimple[]
  className?: string
  loading?: boolean
}

export function ProductGrid({ products, className, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-64 rounded-lg mb-4"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground text-lg">No se encontraron productos</p>
        <p className="text-muted-foreground text-sm mt-2">
          Intenta ajustar tus filtros o busca algo diferente
        </p>
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.name}
          description=""
          price={product.price}
          category={product.category}
          rating={4.5}
          seller="Vendedor"
          location="Venezuela"
          verified={true}
          image={product.image}
          available={product.isAvailable}
        />
      ))}
    </div>
  )
}
