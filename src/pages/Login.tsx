import { AuthForm } from '@/components/ui/premium-auth'

export function Login() {
    return (
        <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="glass-modal rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-enter">
                    {/* Header Gradient */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />

                    <AuthForm
                        onSuccess={(data) => console.log('Auth Success:', data)}
                        className="p-6 md:p-8"
                    />
                </div>

                {/* Footer branding */}
                <div className="text-center mt-8">
                    <p className="text-xs text-[var(--text-secondary)]">
                        Desenvolvido com 💗 pela <span className="text-[var(--accent-blue)] font-medium">InovaSys</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
