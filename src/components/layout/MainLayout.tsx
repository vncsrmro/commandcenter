import { Link, useLocation, Outlet } from 'react-router-dom'
import {
    PieChart,
    Users,
    Wallet,
    Shield,
    Menu
} from 'lucide-react'
import { Sidebar } from './Sidebar'

export function MainLayout() {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Visão Geral', icon: PieChart },
        { path: '/clients', label: 'Clientes', icon: Users },
        { path: '/financial', label: 'Finanças', icon: Wallet },
        { path: '/vault', label: 'Cofre', icon: Shield },
    ]

    return (
        <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-primary)] flex">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <main className="flex-1 min-w-0 md:pl-64 flex flex-col min-h-screen transition-all duration-300">

                {/* Mobile Header (Only visible on mobile) */}
                <div className="md:hidden h-14 border-b border-[var(--border-subtle)] flex items-center justify-between px-4 bg-[var(--bg-background)]/80 backdrop-blur sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                            <PieChart className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">PaperX</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 ring-1 ring-[var(--border-subtle)]" />
                </div>

                {/* Page Content */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8 animate-enter">
                    <Outlet />
                </div>

            </main>

            {/* Mobile Tab Bar (Fixed Bottom) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-surface)]/90 backdrop-blur-xl border-t border-[var(--border-subtle)] pb-safe z-50">
                <div className="flex items-center justify-around h-16">
                    {navItems.map(item => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform"
                            >
                                <item.icon
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={`w-5 h-5 transition-colors ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'}`}
                                />
                                <span className={`text-[10px] font-medium ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                    <Link
                        to="/settings"
                        className="flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform"
                    >
                        <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
                        <span className="text-[10px] font-medium text-[var(--text-secondary)]">Mais</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
