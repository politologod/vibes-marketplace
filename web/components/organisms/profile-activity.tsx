import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { StarIcon, Package, Heart, ShoppingBag, TrendingUp, Eye } from "lucide-react"

interface Transaction {
  id: number
  type: 'sale' | 'purchase'
  product: string
  amount: string
  date: string
  status: 'completed' | 'pending' | 'cancelled'
}

interface FavoriteProduct {
  id: number
  title: string
  price: string
  image: string
}

interface ProfileActivityProps {
  transactions: Transaction[]
  favorites: FavoriteProduct[]
  recentViews: FavoriteProduct[]
}

export function ProfileActivity({ transactions, favorites, recentViews }: ProfileActivityProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning' 
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'pending': return 'Pendiente'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay transacciones recientes
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'sale' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.type === 'sale' ? (
                        <Package className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.type === 'sale' ? 'Vendido' : 'Comprado'} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{transaction.amount}</p>
                    <Badge variant={getStatusVariant(transaction.status)} size="sm">
                      {getStatusLabel(transaction.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Favoritos ({favorites.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tienes productos favoritos
              </p>
            ) : (
              <div className="space-y-3">
                {favorites.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                      <p className="text-sm text-green-600 font-semibold">{product.price}</p>
                    </div>
                  </div>
                ))}
                {favorites.length > 3 && (
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todos ({favorites.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vistos Recientemente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentViews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No has visto productos recientemente
              </p>
            ) : (
              <div className="space-y-3">
                {recentViews.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                      <p className="text-sm text-green-600 font-semibold">{product.price}</p>
                    </div>
                  </div>
                ))}
                {recentViews.length > 3 && (
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todos ({recentViews.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
