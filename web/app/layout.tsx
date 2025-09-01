import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context"
import { Navigation } from "@/components/organisms/navigation"
import { Footer } from "@/components/organisms/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Vibes App - Your Ultimate Shopping Destination",
  description: "Discover amazing products that match your vibe. From fashion to tech, motorcycles to accessories.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}