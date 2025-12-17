import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wide ml-1">{label}</label>}
                <input
                    ref={ref}
                    className={`w-full bg-[#050505]/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#0a0a0a] transition-all ${error ? 'border-red-500/50' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
            </div>
        )
    }
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wide ml-1">{label}</label>}
                <select
                    ref={ref}
                    className={`w-full bg-[#050505]/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#0a0a0a] transition-all ${className}`}
                    {...props}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
            </div>
        )
    }
)
