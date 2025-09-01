import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"

interface Product {
  id: number
  title: string
  description: string
  price: string
  status: 'active' | 'sold' | 'paused'
  image?: string
}

interface ProductListingProps {
  products: Product[]
  onEdit: (productId: number) => void
  onRemove: (productId: number) => void
  onToggleStatus: (productId: number) => void
}

export function ProductListing({ products, onEdit, onRemove, onToggleStatus }: ProductListingProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'sold': return 'secondary'
      case 'paused': return 'warning'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'sold': return 'Vendido'
      case 'paused': return 'Pausado'
      default: return status
    }
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground text-lg">No tienes productos publicados</p>
          <p className="text-muted-foreground text-sm mt-2">
            Crea tu primera publicación en la pestaña "Nuevo Producto"
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-start gap-4">
              <span className="flex-1">{product.title}</span>
              <Badge variant={getStatusVariant(product.status)}>
                {getStatusLabel(product.status)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">${product.price}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product.id)}
                >
                  Editar
                </Button>
                {product.status === 'active' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onToggleStatus(product.id)}
                  >
                    Pausar
                  </Button>
                )}
                {product.status === 'paused' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onToggleStatus(product.id)}
                  >
                    Activar
                  </Button>
                )}
                {product.status !== 'sold' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemove(product.id)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
