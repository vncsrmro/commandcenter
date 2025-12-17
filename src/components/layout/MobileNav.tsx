import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    KeyRound,
    DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    {
        title: 'Home',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Clientes',
        href: '/clients',
        icon: Users,
    },
    {
        title: 'Cofre',
        href: '/vault',
        icon: KeyRound,
    },
    {
        title: 'Financeiro',
        href: '/financial',
        icon: DollarSign,
    },
]

export function MobileNav() {
    const location = useLocation()

    return (
        <nav className="mobile-nav glass md:hidden">
            <div className="flex items-center justify-around h-full px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "mobile-nav-item touch-target",
                                isActive && "active"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </NavLink>
                    )
                })}
            </div>
        </nav>
    )
}
