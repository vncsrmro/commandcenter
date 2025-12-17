import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    KeyRound,
    DollarSign,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Carteira de Clientes',
        href: '/clients',
        icon: Users,
    },
    {
        title: 'Cofre de Senhas',
        href: '/vault',
        icon: KeyRound,
    },
    {
        title: 'Controle Financeiro',
        href: '/financial',
        icon: DollarSign,
    },
]

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-xl glass touch-target md:hidden"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-50 w-72 glass-card flex flex-col transition-transform duration-300 md:transition-none",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-5 border-b border-[hsl(var(--border-subtle))]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--accent-primary))] to-[hsl(160_84%_35%)] flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <div>
                            <span className="font-semibold text-[hsl(var(--text-primary))]">
                                PaperX
                            </span>
                            <p className="text-[10px] text-[hsl(var(--text-muted))] uppercase tracking-wider">
                                Command Center
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--bg-tertiary))] md:hidden"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider px-3 mb-3">
                        Menu Principal
                    </p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 touch-target",
                                    isActive
                                        ? "bg-gradient-to-r from-[hsl(var(--accent-primary)/0.15)] to-[hsl(var(--accent-primary)/0.05)] text-[hsl(var(--accent-primary))] border border-[hsl(var(--accent-primary)/0.2)]"
                                        : "text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--bg-tertiary))] hover:text-[hsl(var(--text-primary))]"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 shrink-0",
                                    isActive && "drop-shadow-[0_0_6px_hsl(var(--accent-primary))]"
                                )} />
                                <span>{item.title}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-primary))]" />
                                )}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-[hsl(var(--border-subtle))] space-y-1.5">
                    <NavLink
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--bg-tertiary))] hover:text-[hsl(var(--text-primary))] transition-all duration-200 touch-target"
                    >
                        <Settings className="w-5 h-5 shrink-0" />
                        <span>Configurações</span>
                    </NavLink>

                    <button
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent-danger)/0.1)] hover:text-[hsl(var(--accent-danger))] transition-all duration-200 touch-target"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span>Sair</span>
                    </button>
                </div>

                {/* User Card */}
                <div className="p-4 border-t border-[hsl(var(--border-subtle))]">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--bg-tertiary))]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--accent-secondary))] to-[hsl(262_83%_48%)] flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">VR</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[hsl(var(--text-primary))] truncate">
                                Admin
                            </p>
                            <p className="text-xs text-[hsl(var(--text-muted))] truncate">
                                admin@paperx.io
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
