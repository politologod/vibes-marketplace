import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/molecules/card"
import { cn } from "@/utils"
import { StarIcon, MapPin, DollarSign } from "lucide-react"

interface ProductCardProps {
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
  className?: string
}

export function ProductCard({
  id,
  title,
  description,
  price,
  category,
  rating,
  seller,
  location,
  verified,
  image = "/placeholder.svg",
  className
}: ProductCardProps) {
  return (
    <Card className={cn("group hover:shadow-xl transition-all duration-300 border-primary/20", className)}>
      <CardHeader padding="none">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={verified ? "success" : "secondary"}>
              {verified ? "Verificado" : category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
            <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-green-600 font-bold">
            <DollarSign className="w-4 h-4" />
            ${price}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">Vendido por {seller}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            Ver Detalles
          </Button>
          <Button size="sm" className="flex-1">
            Comprar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
