import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    isLoading?: boolean
    icon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', isLoading, icon, children, ...props }, ref) => {
        const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"

        const variants = {
            primary: "bg-gradient-to-r from-[var(--accent-blue)] to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 border border-transparent",
            secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--border-highlight)]",
            ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5",
            danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border border-red-500/20"
        }

        const sizes = "px-4 py-2 text-sm"

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : icon ? (
                    <span className="mr-2">{icon}</span>
                ) : null}
                {children}
            </button>
        )
    }
)
