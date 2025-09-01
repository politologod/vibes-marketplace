import { cn } from "@/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}


export function Avatar({ 
  className, 
  src, 
  alt = "Avatar",
  fallback,
  size = 'md',
  ...props 
}: AvatarProps) {
  const baseStyles = "relative flex shrink-0 overflow-hidden rounded-full bg-muted"
  
  const sizes = {
    sm: "h-6 w-6 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  }

  return (
    <div
      className={cn(
        baseStyles,
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium">
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
}
