import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function MainLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const isDashboard = location.pathname === '/'

    return (
        <div className="min-h-screen flex flex-col items-center py-6 px-4 md:py-10">
            {/* Mobile Back Button (Clean) */}
            {!isDashboard && (
                <div className="w-full max-w-6xl mb-4 flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Início</span>
                    </button>
                </div>
            )}

            {/* Main Content Area - Max width for desktop */}
            <main className="w-full max-w-6xl animate-pop">
                <Outlet />
            </main>

            {/* Footer Branding */}
            <footer className="mt-12 text-center">
                <p className="text-[11px] text-white/30 font-medium">
                    Desenvolvido com 💗 pela InovaSys
                    <br />
                    <a href="https://inovasys.digital" target="_blank" className="hover:text-white/50 transition-colors">inovasys.digital</a>
                </p>
            </footer>
        </div>
    )
}
