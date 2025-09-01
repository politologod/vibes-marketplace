import { cn } from "@/utils"

interface AuthHeaderProps {
  title: string
  subtitle: string
  className?: string
}

export function AuthHeader({ title, subtitle, className }: AuthHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-effect mb-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jFebHMaX2FQwxb7fmYgfzS17W7VfzD.png"
          alt="My Vibes App"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <h1 className="text-3xl font-bold text-gradient mb-2">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  )
}
