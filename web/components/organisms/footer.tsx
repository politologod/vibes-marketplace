import { Button } from "@/components/atoms/button"
import Link from "next/link"
import { Github, Twitter, Instagram, Facebook, ShoppingBag } from "lucide-react"

export function Footer() {
  const footerData = {
    title: "Discover Your Vibe",
    sections: {
      about: "About",
      marketplace: "Marketplace", 
      support: "Support",
      legal: "Legal"
    },
    links: {
      aboutUs: "About Us",
      howItWorks: "How It Works",
      careers: "Careers",
      contact: "Contact",
      browse: "Browse Products",
      categories: "Categories",
      sellers: "For Sellers",
      faq: "FAQ",
      help: "Help Center",
      shipping: "Shipping Info",
      returns: "Returns",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy"
    }
  }

  return (
    <footer className="border-t glass-effect bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gradient">{footerData.title}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for discovering amazing products that match your vibe.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{footerData.sections.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {footerData.links.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {footerData.links.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">{footerData.sections.marketplace}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/clothing"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/category/technology"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">{footerData.sections.support}</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  {footerData.links.help}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  {footerData.links.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  {footerData.links.terms}
                </Link>
              </li>
            </ul>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300 glass-effect"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/10 hover:text-secondary transition-all duration-300 glass-effect"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/10 hover:text-accent transition-all duration-300 glass-effect"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300 glass-effect"
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary/20 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2024 Discover Your Vibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
