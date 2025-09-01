"use client"

import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Slider } from "@/components/atoms/slider"
import { Select } from "@/components/molecules/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { Filter } from "lucide-react"

interface FilterSidebarProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  category: string
  onCategoryChange: (category: string) => void
  location: string
  onLocationChange: (location: string) => void
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  onClearFilters: () => void
}

const categories = [
  { value: "all", label: "Todas las Categorías" },
  { value: "clothing", label: "Ropa" },
  { value: "footwear", label: "Calzado" },
  { value: "technology", label: "Tecnología" },
  { value: "automotive", label: "Automotriz" },
  { value: "food", label: "Comida" },
  { value: "furniture", label: "Muebles" },
  { value: "books", label: "Libros" }
]

const locations = [
  { value: "all", label: "Todas las Ubicaciones" },
  { value: "DC", label: "Caracas" },
  { value: "AN", label: "Barcelona" },
  { value: "CA", label: "Valencia" },
  { value: "LA", label: "Barquisimeto" },
  { value: "ZU", label: "Maracaibo" },
  { value: "TA", label: "San Cristóbal" }
]

export function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  searchQuery,
  onSearchQueryChange,
  onClearFilters
}: FilterSidebarProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Buscar</Label>
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select
            options={categories}
            placeholder="Seleccionar categoría"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Ubicación</Label>
          <Select
            options={locations}
            placeholder="Seleccionar ubicación"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <Label>Rango de Precio</Label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
        >
          Limpiar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}
