
import { Hero } from "@/components/organisms/hero"
import { Footer } from "@/components/organisms/footer"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}