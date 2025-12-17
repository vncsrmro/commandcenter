import { useState } from 'react'
import {
    Plus,
    Search,
    Building2,
    Calendar,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Pencil,
    Loader2,
    MoreHorizontal
} from 'lucide-react'
import { useClients } from '@/hooks/useClients'

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateString: string) {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('pt-BR')
}

export function Clients() {
    const { clients, loading, error } = useClients()
    const [searchTerm, setSearchTerm] = useState('')

    const filtered = clients.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleNew = () => {
        alert('Create functionality coming in next update')
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-[50vh] items-center justify-center text-red-500">
                Erro ao carregar clientes: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-enter">

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Carteira de Clientes</h1>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">Gerencie contratos e status financeiro.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a] group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar empresa ou ID..."
                            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-blue-500/50 transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleNew}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Novo</span>
                    </button>
                </div>
            </div>

            {/* 2. Desktop Data Table (Visible on MD+) */}
            <div className="hidden md:block border border-[#27272a] rounded-lg overflow-hidden bg-[#101012]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#18181b] text-[#a1a1aa] font-medium border-b border-[#27272a]">
                        <tr>
                            <th className="px-4 py-3 font-medium">Cliente</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Plano</th>
                            <th className="px-4 py-3 font-medium text-right">Mensalidade</th>
                            <th className="px-4 py-3 font-medium text-right">Vencimento</th>
                            <th className="px-4 py-3 font-medium w-[50px]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a]">
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-[#52525b]">
                                    Nenhum cliente encontrado.
                                </td>
                            </tr>
                        )}
                        {filtered.map((client) => {
                            const statusColor =
                                client.status === 'active' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                                    client.status === 'blocked' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' :
                                        'text-red-500 bg-red-500/10 border-red-500/20';

                            return (
                                <tr key={client.id} className="hover:bg-[#18181b] transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-[#18181b] flex items-center justify-center text-[#a1a1aa] font-bold text-xs ring-1 ring-[#27272a]">
                                                {client.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{client.name}</p>
                                                <p className="text-xs text-[#71717a] font-mono">{client.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusColor}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[#e4e4e7] capitalize">{client.plan}</td>
                                    <td className="px-4 py-3 text-right font-mono text-[#a1a1aa] group-hover:text-white transition-colors">
                                        {formatCurrency(client.monthly_value)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-[#71717a] bg-[#18181b] px-2 py-1 rounded border border-[#27272a]">
                                            <Calendar className="w-3 h-3" />
                                            Day {new Date(client.due_date).getDate()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1.5 hover:bg-[#27272a] rounded text-[#71717a] hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* 3. Mobile Card Grid (Visible on Mobile) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {filtered.map((client) => {
                    const statusColor =
                        client.status === 'active' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                            client.status === 'blocked' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' :
                                'text-red-500 bg-red-500/10 border-red-500/20';

                    const StatusIcon =
                        client.status === 'active' ? CheckCircle2 :
                            client.status === 'blocked' ? AlertCircle : XCircle;

                    return (
                        <div key={client.id} className="pro-card p-4 hover:border-[#3f3f46] transition-colors group cursor-default relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-[#18181b] flex items-center justify-center text-[#a1a1aa] font-bold text-lg ring-1 ring-[#27272a]">
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white leading-tight">{client.name}</h3>
                                        <div className="flex items-center gap-1.5 text-xs text-[#71717a] mt-0.5">
                                            <Building2 className="w-3 h-3" />
                                            <span className="font-mono">{client.slug}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border flex items-center gap-1 ${statusColor}`}>
                                    <StatusIcon className="w-3 h-3" />
                                    {client.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-[#27272a] mb-3">
                                <div>
                                    <p className="text-[10px] text-[#71717a] uppercase font-bold mb-0.5">Plano</p>
                                    <p className="text-sm font-medium text-[#e4e4e7] capitalize">{client.plan}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-[#71717a] uppercase font-bold mb-0.5">Mensalidade</p>
                                    <p className="text-sm font-mono font-medium text-white">{formatCurrency(client.monthly_value)}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Vence dia <span className="text-white font-mono">{formatDate(client.due_date)}</span></span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 hover:bg-[#27272a] rounded text-[#a1a1aa] hover:text-white transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
