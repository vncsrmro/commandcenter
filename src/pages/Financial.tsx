import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Plus,
    Search,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react'
import type { Transaction, TransactionType, TransactionStatus } from '@/types'

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
    {
        id: '7',
        type: 'expense',
        status: 'pending',
        amount: 299,
        description: 'Licença Software - JetBrains',
        dueDate: '2024-01-28',
        createdAt: '2024-01-01',
    },
]

const statusConfig: Record<TransactionStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
    paid: { label: 'Pago', variant: 'success' },
    pending: { label: 'Pendente', variant: 'warning' },
    overdue: { label: 'Atrasado', variant: 'danger' },
}

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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

    // Form state
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

    // Calculate totals
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
        <div className="flex flex-col h-full">
            <Header
                title="Controle Financeiro"
                description="Acompanhe receitas e despesas"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="hover:border-emerald-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Total Recebido
                            </CardTitle>
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-400">
                                {formatCurrency(totalIncome)}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Este mês
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-amber-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                A Receber
                            </CardTitle>
                            <TrendingUp className="w-4 h-4 text-amber-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-400">
                                {formatCurrency(totalPendingIncome)}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Pendente/Atrasado
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-red-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Total de Despesas
                            </CardTitle>
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-400">
                                {formatCurrency(totalExpenses)}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Pago este mês
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-violet-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Saldo
                            </CardTitle>
                            <DollarSign className="w-4 h-4 text-violet-400" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {formatCurrency(balance)}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Receitas - Despesas
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-1 gap-3 w-full sm:w-auto flex-wrap">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                            <Input
                                placeholder="Buscar transação..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TransactionType | 'all')}>
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="income">Receitas</SelectItem>
                                <SelectItem value="expense">Despesas</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TransactionStatus | 'all')}>
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="paid">Pago</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="overdue">Atrasado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => resetForm()}>
                                <Plus className="w-4 h-4 mr-2" />
                                Nova Transação
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[450px]">
                            <DialogHeader>
                                <DialogTitle>Nova Transação</DialogTitle>
                                <DialogDescription>
                                    Registre uma nova receita ou despesa.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Tipo</label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(v) => setFormData({ ...formData, type: v as TransactionType })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="income">Receita</SelectItem>
                                                <SelectItem value="expense">Despesa</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(v) => setFormData({ ...formData, status: v as TransactionStatus })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pendente</SelectItem>
                                                <SelectItem value="paid">Pago</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Descrição</label>
                                    <Input
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Ex: Mensalidade Cliente X"
                                    />
                                </div>

                                {formData.type === 'income' && (
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Cliente (opcional)</label>
                                        <Input
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                            placeholder="Nome do cliente"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Valor (R$)</label>
                                        <Input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Data de Vencimento</label>
                                        <Input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSubmit}>
                                    Adicionar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Transactions Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Vencimento</TableHead>
                                    <TableHead className="text-right">Valor</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTransactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-[hsl(var(--muted-foreground))]">
                                            Nenhuma transação encontrada
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{transaction.description}</p>
                                                    {transaction.clientName && (
                                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                            {transaction.clientName}
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {transaction.type === 'income' ? (
                                                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                                                    ) : (
                                                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                                                    )}
                                                    <span>{transaction.type === 'income' ? 'Receita' : 'Despesa'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={statusConfig[transaction.status].variant}>
                                                    {statusConfig[transaction.status].label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDate(transaction.dueDate)}</TableCell>
                                            <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                                                }`}>
                                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {transaction.status !== 'paid' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleMarkAsPaid(transaction.id)}
                                                    >
                                                        Marcar como Pago
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
