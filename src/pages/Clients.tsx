import { useState } from 'react'
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Users,
    Building2,
    MoreHorizontal
} from 'lucide-react'
import type { Client } from '@/types'

// Mock data
const initialClients: Client[] = [
    { id: '1', name: 'Tech Solutions', slug: 'tech-solutions', status: 'active', plan: 'professional', dueDate: '2024-01-20', monthlyValue: 599, createdAt: '', updatedAt: '' },
    { id: '2', name: 'Digital Agency', slug: 'digital-agency', status: 'active', plan: 'enterprise', dueDate: '2024-01-22', monthlyValue: 899, createdAt: '', updatedAt: '' },
    { id: '3', name: 'StartupX', slug: 'startupx', status: 'active', plan: 'essential', dueDate: '2024-01-25', monthlyValue: 349, createdAt: '', updatedAt: '' },
]

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function Clients() {
    const [clients] = useState<Client[]>(initialClients)
    const [searchTerm, setSearchTerm] = useState('')

    const filtered = clients.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleNew = () => {
        alert('Nova feature em breve')
    }

    return (
        <div className="animate-pop max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    {/* Branding Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Carteira</h1>
                        <p className="text-blue-200/60 font-medium">Gestão de Clientes</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white/80 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:bg-white/10 focus:border-white/20 focus:outline-none transition-all w-full md:w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={handleNew} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Novo Cliente</span>
                    </button>
                </div>
            </div>

            {/* Modern Grid/List Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((client) => (
                    <div key={client.id} className="widget p-0 group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                        {/* Card Content */}
                        <div className="p-5 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-lg">
                                    {client.name.charAt(0)}
                                </div>
                                <button className="text-white/20 hover:text-white transition-colors p-1">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 truncate">{client.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                                <Building2 className="w-3 h-3" />
                                <span>{client.slug}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Mensalidade</p>
                                    <p className="text-sm font-semibold text-green-400">{formatCurrency(client.monthlyValue)}</p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/70 transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Gradient Blob */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-500/30 transition-all pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    )
}
