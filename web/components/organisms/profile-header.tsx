import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { Avatar } from "@/components/atoms/avatar"
import { Card, CardContent } from "@/components/molecules/card"
import { Camera, StarIcon } from "lucide-react"

interface ProfileStats {
  totalSales: number
  totalRevenue: string
  activeProducts: number
  totalViews: string
}

interface ProfileHeaderProps {
  name: string
  joinDate: string
  rating: number
  reviewCount: number
  verified: boolean
  avatarUrl?: string
  stats: ProfileStats
  onAvatarChange?: () => void
}

export function ProfileHeader({
  name,
  joinDate,
  rating,
  reviewCount,
  verified,
  avatarUrl,
  stats,
  onAvatarChange
}: ProfileHeaderProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-xl" />
      <Card className="relative border-0 glass-effect backdrop-blur-xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <Avatar
                src={avatarUrl}
                fallback={name.split(' ').map(n => n[0]).join('')}
                size="xl"
                className="border-4 border-primary/20"
              />
              {onAvatarChange && (
                <Button
                  size="sm"
                  onClick={onAvatarChange}
                  className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0 bg-primary hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-gradient">
                  {name}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Miembro desde {joinDate}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-muted-foreground">• {reviewCount} reseñas</span>
                  </div>
                  {verified && (
                    <Badge variant="success" className="bg-green-500/20 text-green-700 border-green-500/30">
                      Verificado
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">{stats.totalSales}</div>
                  <div className="text-sm text-muted-foreground">Ventas Totales</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary">{stats.totalRevenue}</div>
                  <div className="text-sm text-muted-foreground">Ingresos</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent">{stats.activeProducts}</div>
                  <div className="text-sm text-muted-foreground">Productos Activos</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-600">{stats.totalViews}</div>
                  <div className="text-sm text-muted-foreground">Visualizaciones</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
