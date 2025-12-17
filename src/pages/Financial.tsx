import {
    DollarSign,
    TrendingDown,
    TrendingUp,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    Filter,
    Download,
    Loader2
} from 'lucide-react'
import { useFinancial } from '@/hooks/useFinancial'

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateString: string) {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function Financial() {
    const { transactions, stats, loading, error } = useFinancial()

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
                Erro ao carregar financeiro: {error}
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-enter">

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Financeiro</h1>
                    <p className="text-sm text-[#a1a1aa] mt-0.5">Fluxo de caixa e histórico de movimentações.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#e4e4e7] hover:bg-[#27272a] transition-colors">
                        <Calendar className="w-4 h-4 text-[#71717a]" />
                        <span>Este Mês</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors">
                        <DollarSign className="w-4 h-4" />
                        <span>Nova</span>
                    </button>
                </div>
            </div>

            {/* 2. KPI Cards - Clean & Solid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="pro-card p-5 bg-[#18181b] flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <span className="text-[#a1a1aa] text-xs font-bold uppercase tracking-wider">Entradas</span>
                        <div className="p-1.5 rounded-md bg-green-500/10 text-green-500">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tabular-nums font-mono">+ {formatCurrency(stats.income)}</h2>
                        <p className="text-xs text-green-500 font-medium mt-1">+12% vs mês anterior</p>
                    </div>
                </div>

                <div className="pro-card p-5 bg-[#18181b] flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <span className="text-[#a1a1aa] text-xs font-bold uppercase tracking-wider">Saídas</span>
                        <div className="p-1.5 rounded-md bg-red-500/10 text-red-500">
                            <TrendingDown className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tabular-nums font-mono">- {formatCurrency(Math.abs(stats.expense))}</h2>
                        <p className="text-xs text-[#71717a] font-medium mt-1">Estável</p>
                    </div>
                </div>

                <div className="pro-card p-5 bg-[#18181b] flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-[#a1a1aa] text-xs font-bold uppercase tracking-wider">Saldo Líquido</span>
                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                            <DollarSign className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white tabular-nums font-mono">{formatCurrency(stats.balance)}</h2>
                        <p className="text-xs text-blue-400 font-medium mt-1">Margem segura</p>
                    </div>
                </div>

            </div>

            {/* 3. Transactions Table - High Density */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">Transações Recentes</h3>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-[#27272a] rounded-lg text-[#71717a] transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#27272a] rounded-lg text-[#71717a] transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="pro-card overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#27272a] text-[#a1a1aa] text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-3 font-medium">Descrição</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Categoria</th>
                                <th className="px-6 py-3 font-medium text-right">Data</th>
                                <th className="px-6 py-3 font-medium text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a]">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[#52525b]">
                                        Nenhuma transação registrada.
                                    </td>
                                </tr>
                            ) : transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-[#27272a]/40 transition-colors group cursor-default">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded ${t.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {t.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                            </div>
                                            <span className="font-medium text-white group-hover:text-blue-100">{t.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#a1a1aa] hidden md:table-cell">
                                        <span className="px-2 py-1 rounded bg-[#27272a] text-xs">Geral</span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-[#71717a] font-mono text-xs">{formatDate(t.created_at)}</td>
                                    <td className={`px-6 py-4 text-right font-mono font-medium ${t.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                                        {t.type === 'income' ? '+' : ''} {formatCurrency(t.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
