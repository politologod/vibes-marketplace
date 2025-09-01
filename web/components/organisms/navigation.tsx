"use client"

import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { Sheet } from "@/components/organisms/sheet"
import { SearchBar } from "@/components/molecules/search-bar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/organisms/dropdown-menu"
import { Menu, ShoppingCart, LogIn, UserPlus, User, Plus, Minus, Trash2, CreditCard, ShoppingBag, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/context"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 999,
      quantity: 1,
      image: "/modern-smartphone.png",
    },
    {
      id: "2",
      name: "Nike Air Max",
      price: 150,
      quantity: 2,
      image: "/athletic-shoes.png",
    },
  ])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const navData = {
    brand: "Discover Your Vibe",
    search: {
      placeholder: "Search products..."
    },
    menu: {
      home: "Home",
      browse: "Browse",
      categories: "Categories", 
      sell: "Sell",
      about: "About"
    },
    auth: {
      login: "Login",
      register: "Register",
      profile: "Profile",
      logout: "Logout"
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout",
      remove: "Remove item"
    }
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 glass-effect">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png"
              alt="My Vibes App Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/browse"
              className="transition-all duration-300 hover:text-primary hover:neon-glow text-foreground font-medium"
            >
              {navData.menu.browse}
            </Link>
            <Link
              href="/sell"
              className="transition-all duration-300 hover:text-secondary hover:neon-glow text-foreground font-medium"
            >
              {navData.menu.sell}
            </Link>
            {isAuthenticated && (
              <Link
                href="/profile"
                className="transition-all duration-300 hover:text-primary hover:neon-glow text-foreground font-medium"
              >
                {navData.auth.profile}
              </Link>
            )}
          </nav>
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden hover:text-primary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <Sheet 
          open={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
          side="left" 
          size="full"
        >
          <div className="pr-0">
            <div className="flex items-center space-x-2 px-2 py-4 border-b">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png"
                alt="My Vibes App Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <nav className="grid gap-6 px-2 py-6">
              <Link href="/browse" className="hover:text-primary font-medium transition-all duration-300">
                {navData.menu.browse}
              </Link>
              <Link href="/sell" className="hover:text-secondary font-medium transition-all duration-300">
                {navData.menu.sell}
              </Link>
              {isAuthenticated && (
                <Link href="/profile" className="hover:text-primary font-medium transition-all duration-300">
                  {navData.auth.profile}
                </Link>
              )}
              {!isAuthenticated && (
                <>
                  <Link href="/login" className="hover:text-primary font-medium transition-all duration-300">
                    {navData.auth.login}
                  </Link>
                  <Link href="/register" className="hover:text-secondary font-medium transition-all duration-300">
                    {navData.auth.register}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar
              placeholder={navData.search.placeholder}
              className="md:w-[300px] lg:w-[400px]"
              onSearch={(query) => {
                console.log('Search:', query)
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-primary/10 transition-all duration-300">
                <ShoppingCart className="h-5 w-5 text-primary" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect w-80 p-0">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg gradient-text">{navData.cart.title}</h3>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  {navData.cart.empty}
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 border-b last:border-b-0 hover:bg-primary/5 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-primary font-semibold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-primary/20"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-primary/20"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t bg-muted/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">{navData.cart.total}:</span>
                      <span className="font-bold text-lg text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {navData.cart.checkout}
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect w-48">
              {isAuthenticated && (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10">
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      {navData.auth.profile}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-red-100 text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {navData.auth.logout}
                  </DropdownMenuItem>
                </>
              )}



              {!isAuthenticated && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10">
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      {navData.auth.login}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-secondary/10">
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      {navData.auth.register}
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
