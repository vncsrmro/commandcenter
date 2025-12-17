import { useState } from 'react'
import {
    Plus,
    Search,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    X,
    Wallet,
    Receipt,
} from 'lucide-react'
import type { Transaction, TransactionType, TransactionStatus } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const initialTransactions: Transaction[] = [
    {
        id: '1',
        clientId: '1',
        clientName: 'Tech Solutions',
        type: 'income',
        status: 'paid',
        amount: 599,
        description: 'Mensalidade Janeiro',
        dueDate: '2024-01-20',
        paidAt: '2024-01-18',
        createdAt: '2024-01-01',
    },
    {
        id: '2',
        clientId: '2',
        clientName: 'Digital Agency',
        type: 'income',
        status: 'pending',
        amount: 899,
        description: 'Mensalidade Janeiro',
        dueDate: '2024-01-22',
        createdAt: '2024-01-01',
    },
    {
        id: '3',
        clientId: '3',
        clientName: 'StartupX',
        type: 'income',
        status: 'pending',
        amount: 349,
        description: 'Mensalidade Janeiro',
        dueDate: '2024-01-25',
        createdAt: '2024-01-01',
    },
    {
        id: '4',
        clientId: '4',
        clientName: 'Old Corp',
        type: 'income',
        status: 'overdue',
        amount: 599,
        description: 'Mensalidade Janeiro',
        dueDate: '2024-01-10',
        createdAt: '2024-01-01',
    },
    {
        id: '5',
        type: 'expense',
        status: 'paid',
        amount: 150,
        description: 'Servidor Cloud - DigitalOcean',
        dueDate: '2024-01-15',
        paidAt: '2024-01-15',
        createdAt: '2024-01-01',
    },
    {
        id: '6',
        type: 'expense',
        status: 'paid',
        amount: 49,
        description: 'Domínios - Cloudflare',
        dueDate: '2024-01-10',
        paidAt: '2024-01-10',
        createdAt: '2024-01-01',
    },
]

const statusConfig: Record<TransactionStatus, { label: string; class: string }> = {
    paid: { label: 'Pago', class: 'badge-success' },
    pending: { label: 'Pendente', class: 'badge-warning' },
    overdue: { label: 'Atrasado', class: 'badge-danger' },
}

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
    }).format(new Date(dateString))
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function Financial() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [formData, setFormData] = useState({
        type: 'income' as TransactionType,
        status: 'pending' as TransactionStatus,
        amount: '',
        description: '',
        dueDate: '',
        clientName: '',
    })

    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === 'all' || t.type === typeFilter
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter
        return matchesSearch && matchesType && matchesStatus
    })

    const totalIncome = transactions
        .filter((t) => t.type === 'income' && t.status === 'paid')
        .reduce((sum, t) => sum + t.amount, 0)

    const totalPendingIncome = transactions
        .filter((t) => t.type === 'income' && (t.status === 'pending' || t.status === 'overdue'))
        .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions
        .filter((t) => t.type === 'expense' && t.status === 'paid')
        .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpenses

    const resetForm = () => {
        setFormData({
            type: 'income',
            status: 'pending',
            amount: '',
            description: '',
            dueDate: '',
            clientName: '',
        })
    }

    const handleSubmit = () => {
        const now = new Date().toISOString()
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: formData.type,
            status: formData.status,
            amount: parseFloat(formData.amount),
            description: formData.description,
            dueDate: formData.dueDate,
            clientName: formData.clientName || undefined,
            paidAt: formData.status === 'paid' ? now : undefined,
            createdAt: now,
        }
        setTransactions([newTransaction, ...transactions])
        setIsDialogOpen(false)
        resetForm()
    }

    const handleMarkAsPaid = (id: string) => {
        setTransactions(
            transactions.map((t) =>
                t.id === id
                    ? { ...t, status: 'paid' as TransactionStatus, paidAt: new Date().toISOString() }
                    : t
            )
        )
    }

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <header className="sticky top-0 z-10 glass px-4 md:px-6 py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                                Financeiro
                            </h1>
                            <p className="text-sm text-[hsl(var(--text-secondary))] hidden md:block">
                                Acompanhe receitas e despesas
                            </p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setIsDialogOpen(true) }}
                            className="btn-primary text-sm touch-target"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Nova Transação</span>
                        </button>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-modern pl-10"
                            />
                        </div>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'all')}
                            className="input-modern w-auto"
                        >
                            <option value="all">Tipo</option>
                            <option value="income">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | 'all')}
                            className="input-modern w-auto"
                        >
                            <option value="all">Status</option>
                            <option value="paid">Pago</option>
                            <option value="pending">Pendente</option>
                            <option value="overdue">Atrasado</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="px-4 md:px-6 py-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="glass-card kpi-card rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="kpi-icon bg-gradient-to-br from-emerald-500 to-emerald-600 w-10 h-10 rounded-xl">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Recebido</p>
                    </div>

                    <div className="glass-card kpi-card rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="kpi-icon bg-gradient-to-br from-amber-500 to-orange-500 w-10 h-10 rounded-xl">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-amber-400">{formatCurrency(totalPendingIncome)}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">A Receber</p>
                    </div>

                    <div className="glass-card kpi-card rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="kpi-icon bg-gradient-to-br from-red-500 to-red-600 w-10 h-10 rounded-xl">
                                <ArrowDownRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Despesas</p>
                    </div>

                    <div className="glass-card kpi-card rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="kpi-icon bg-gradient-to-br from-violet-500 to-violet-600 w-10 h-10 rounded-xl">
                                <Wallet className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className={cn("text-xl md:text-2xl font-bold", balance >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                            {formatCurrency(balance)}
                        </p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Saldo</p>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="flex-1 px-4 md:px-6 pb-6">
                {/* Desktop Table */}
                <div className="hidden lg:block glass-card rounded-2xl overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Status</th>
                                <th>Vencimento</th>
                                <th className="text-right">Valor</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="empty-state">
                                            <div className="empty-state-icon">
                                                <Receipt className="w-6 h-6" />
                                            </div>
                                            <p className="empty-state-title">Nenhuma transação encontrada</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>
                                            <div>
                                                <p className="font-medium text-[hsl(var(--text-primary))]">{transaction.description}</p>
                                                {transaction.clientName && (
                                                    <p className="text-sm text-[hsl(var(--text-muted))]">{transaction.clientName}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {transaction.type === 'income' ? (
                                                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                                                ) : (
                                                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                                                )}
                                                <span className="text-[hsl(var(--text-secondary))]">
                                                    {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusConfig[transaction.status].class)}>
                                                {statusConfig[transaction.status].label}
                                            </span>
                                        </td>
                                        <td className="text-[hsl(var(--text-secondary))]">
                                            {formatDate(transaction.dueDate)}
                                        </td>
                                        <td className={cn("text-right font-semibold", transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400')}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="text-right">
                                            {transaction.status !== 'paid' && (
                                                <button
                                                    onClick={() => handleMarkAsPaid(transaction.id)}
                                                    className="text-sm text-[hsl(var(--accent-primary))] hover:underline"
                                                >
                                                    Marcar Pago
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="glass-card rounded-2xl">
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <p className="empty-state-title">Nenhuma transação encontrada</p>
                            </div>
                        </div>
                    ) : (
                        filteredTransactions.map((transaction, index) => (
                            <div
                                key={transaction.id}
                                className={cn(
                                    "glass-card mobile-card rounded-2xl animate-slide-up",
                                    `stagger-${Math.min(index + 1, 4)}`
                                )}
                                style={{ animationFillMode: 'backwards' }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                            transaction.type === 'income'
                                                ? 'bg-emerald-500/20'
                                                : 'bg-red-500/20'
                                        )}>
                                            {transaction.type === 'income' ? (
                                                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                                            ) : (
                                                <ArrowDownRight className="w-5 h-5 text-red-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[hsl(var(--text-primary))]">{transaction.description}</p>
                                            {transaction.clientName && (
                                                <p className="text-sm text-[hsl(var(--text-muted))]">{transaction.clientName}</p>
                                            )}
                                            <p className="text-xs text-[hsl(var(--text-muted))] mt-1">{formatDate(transaction.dueDate)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("font-bold", transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400')}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </p>
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", statusConfig[transaction.status].class)}>
                                            {statusConfig[transaction.status].label}
                                        </span>
                                    </div>
                                </div>

                                {transaction.status !== 'paid' && (
                                    <button
                                        onClick={() => handleMarkAsPaid(transaction.id)}
                                        className="w-full mt-4 pt-4 border-t border-[hsl(var(--border-subtle)/0.5)] text-sm text-[hsl(var(--accent-primary))]"
                                    >
                                        Marcar como Pago
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {isDialogOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
                        onClick={() => setIsDialogOpen(false)}
                    />
                    <div className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 animate-slide-up">
                        <div className="glass-card rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[hsl(var(--text-primary))]">
                                    Nova Transação
                                </h2>
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--bg-tertiary))] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Tipo
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                                            className="input-modern"
                                        >
                                            <option value="income">Receita</option>
                                            <option value="expense">Despesa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as TransactionStatus })}
                                            className="input-modern"
                                        >
                                            <option value="pending">Pendente</option>
                                            <option value="paid">Pago</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Descrição
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Ex: Mensalidade Cliente X"
                                        className="input-modern"
                                    />
                                </div>

                                {formData.type === 'income' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Cliente (opcional)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                            placeholder="Nome do cliente"
                                            className="input-modern"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Valor (R$)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            placeholder="0.00"
                                            className="input-modern"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Vencimento
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            className="input-modern"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setIsDialogOpen(false)} className="btn-secondary flex-1">
                                    Cancelar
                                </button>
                                <button onClick={handleSubmit} className="btn-primary flex-1">
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
