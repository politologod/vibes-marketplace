import { ProductCard } from "@/components/organisms/product-card"
import { cn } from "@/utils"

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  rating: number
  seller: string
  location: string
  verified: boolean
  image?: string
}

interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
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
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
          rating={product.rating}
          seller={product.seller}
          location={product.location}
          verified={product.verified}
          image={product.image}
        />
      ))}
    </div>
  )
}
