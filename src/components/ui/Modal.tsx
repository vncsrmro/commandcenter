import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export function Modal({ isOpen, onClose, title, description, children, footer }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Content: Glassmorphism */}
            <div className="relative z-10 w-full max-w-lg glass-modal rounded-2xl overflow-hidden animate-enter border border-white/10">

                {/* Header Gradient Border Check */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

                <div className="flex items-center justify-between p-6">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                        {description && <p className="text-sm text-[#a1a1aa] mt-1">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-[#71717a] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {footer && (
                    <div className="p-6 pt-4 bg-white/5 border-t border-white/5 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
