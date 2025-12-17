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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-lg bg-[#101012] border border-[#27272a] rounded-lg shadow-2xl overflow-hidden animate-enter">
                <div className="flex items-center justify-between p-4 border-b border-[#27272a]">
                    <div>
                        <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
                        {description && <p className="text-xs text-[#a1a1aa] mt-0.5">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#71717a] hover:text-white transition-colors rounded hover:bg-[#27272a]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {footer && (
                    <div className="p-4 bg-[#18181b] border-t border-[#27272a] flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
