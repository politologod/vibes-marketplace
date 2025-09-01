import { Button } from "@/components/atoms/button"
import Link from "next/link"
import { cn } from "@/utils"

interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  className?: string
}

interface CTAButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  buttons: CTAButton[]
}

export function CTAButtons({ buttons, className, ...props }: CTAButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-4",
        className
      )}
      {...props}
    >
      {buttons.map((button, index) => (
        <Link key={index} href={button.href}>
          <Button
            size="lg"
            variant={button.variant || 'primary'}
            className={cn(
              "rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300",
              button.className
            )}
          >
            {button.text}
          </Button>
        </Link>
      ))}
    </div>
  )
}
