import { CategoryTags } from "@/components/molecules/category-tags"
import { CTAButtons } from "@/components/molecules/cta-buttons"
import { StatsSection } from "@/components/molecules/stats-section"

export function Hero() {
  const heroData = {
    title: "Discover Your Vibe",
    subtitle: "Find unique products that match your style and personality. From fashion to tech, discover amazing items from sellers around the world.",
    categories: [
      { name: "Clothing", variant: "default" as const },
      { name: "Technology", variant: "secondary" as const },
      { name: "Shoes", variant: "success" as const },
      { name: "Food", variant: "default" as const },
      { name: "Accessories", variant: "secondary" as const }
    ],
    ctaButtons: [
      {
        text: "Start Shopping",
        href: "/browse",
        variant: "primary" as const,
        className: "gradient-primary text-white border-0 shadow-lg hover:shadow-xl hover:neon-glow"
      },
      {
        text: "Browse Categories",
        href: "/categories",
        variant: "outline" as const,
        className: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg bg-transparent glass-effect"
      }
    ],
    stats: [
      { value: "10K+", label: "Products", color: "primary" as const },
      { value: "5K+", label: "Sellers", color: "secondary" as const },
      { value: "50K+", label: "Happy Customers", color: "accent" as const },
      { value: "24/7", label: "Support", color: "primary" as const }
    ]
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-gradient mb-6">
            {heroData.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto text-balance">
            {heroData.subtitle}
          </p>

          <CategoryTags 
            categories={heroData.categories}
            className="mt-8 text-sm text-muted-foreground"
          />

          <CTAButtons 
            buttons={heroData.ctaButtons}
            className="mt-12"
          />

          <StatsSection 
            stats={heroData.stats}
            className="mt-16"
          />
        </div>
      </div>
    </div>
  )
}
