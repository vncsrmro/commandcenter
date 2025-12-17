import { Link, useLocation } from 'react-router-dom'
import {
    PieChart,
    Users,
    Wallet,
    Shield,
    Settings,
    LogOut,
    ChevronsUpDown
} from 'lucide-react'

export function Sidebar() {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Visão Geral', icon: PieChart },
        { path: '/clients', label: 'Clientes', icon: Users },
        { path: '/financial', label: 'Controle Financeiro', icon: Wallet },
        { path: '/vault', label: 'Cofre de Senhas', icon: Shield },
    ]

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#09090b] border-r border-[#27272a] z-50">
            {/* 1. Brand / Workspace Switcher */}
            <div className="p-4 border-b border-[#27272a]">
                <button className="w-full flex items-center gap-3 p-2 hover:bg-[#27272a] rounded-lg transition-colors text-left group">
                    <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                        <PieChart className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">PaperX Center</p>
                        <p className="text-[10px] text-[#a1a1aa] truncate group-hover:text-white transition-colors">Workspace Pro</p>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-[#52525b] group-hover:text-white" />
                </button>
            </div>

            {/* 2. Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
                <p className="px-2 text-[10px] font-bold text-[#52525b] uppercase tracking-wider mb-2">Principal</p>
                {navItems.map(item => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all group ${
                                isActive 
                                ? 'bg-[#27272a] text-white shadow-sm' 
                                : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-[#71717a] group-hover:text-[#a1a1aa]'}`} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* 3. User / Footer */}
            <div className="p-4 border-t border-[#27272a]">
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50 rounded-md transition-colors w-full text-left">
                        <Settings className="w-4 h-4" />
                        Configurações
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#a1a1aa] hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors w-full text-left">
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
                
                <div className="mt-4 px-2 pt-4 border-t border-[#27272a]/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 ring-2 ring-[#27272a]" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">Admin User</p>
                        <p className="text-[10px] text-[#71717a] truncate">admin@paperx.io</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
