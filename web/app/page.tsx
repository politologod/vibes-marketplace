
import { Navigation } from "@/components/organisms/navigation"
import { Hero } from "@/components/organisms/hero"
import { Footer } from "@/components/organisms/footer"
import { FeaturedProducts } from "@/components/organisms/featured-products"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}