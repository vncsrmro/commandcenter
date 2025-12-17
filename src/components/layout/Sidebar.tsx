import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    KeyRound,
    DollarSign,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Logo */}
            <div className={cn(
                "flex items-center h-16 px-4 border-b border-[hsl(var(--border))]",
                collapsed ? "justify-center" : "justify-between"
            )}>
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">P</span>
                        </div>
                        <span className="font-semibold text-[hsl(var(--foreground))]">
                            PaperX
                        </span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">P</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]",
                                collapsed && "justify-center px-2"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-[hsl(var(--border))] space-y-1">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]",
                            collapsed && "justify-center px-2"
                        )
                    }
                >
                    <Settings className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Configurações</span>}
                </NavLink>

                <button
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full text-[hsl(var(--muted-foreground))] hover:bg-red-500/10 hover:text-red-400",
                        collapsed && "justify-center px-2"
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Sair</span>}
                </button>

                {/* Collapse Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "w-full mt-2 text-[hsl(var(--muted-foreground))]",
                        collapsed && "px-2"
                    )}
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            <span>Recolher</span>
                        </>
                    )}
                </Button>
            </div>
        </aside>
    )
}
