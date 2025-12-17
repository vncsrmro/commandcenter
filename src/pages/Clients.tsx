import { useState } from 'react'
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Calendar,
    Building2,
} from 'lucide-react'
import type { Client, ClientStatus, ClientPlan } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const initialClients: Client[] = [
    {
        id: '1',
        name: 'Tech Solutions',
        slug: 'tech-solutions',
        status: 'active',
        plan: 'professional',
        dueDate: '2024-01-20',
        monthlyValue: 599,
        notes: 'Cliente desde 2022',
        createdAt: '2022-05-15',
        updatedAt: '2024-01-10',
    },
    {
        id: '2',
        name: 'Digital Agency',
        slug: 'digital-agency',
        status: 'active',
        plan: 'enterprise',
        dueDate: '2024-01-22',
        monthlyValue: 899,
        createdAt: '2023-03-20',
        updatedAt: '2024-01-08',
    },
    {
        id: '3',
        name: 'StartupX',
        slug: 'startupx',
        status: 'active',
        plan: 'essential',
        dueDate: '2024-01-25',
        monthlyValue: 349,
        createdAt: '2023-08-10',
        updatedAt: '2024-01-05',
    },
    {
        id: '4',
        name: 'Old Corp',
        slug: 'old-corp',
        status: 'blocked',
        plan: 'professional',
        dueDate: '2024-01-10',
        monthlyValue: 599,
        notes: 'Inadimplente - aguardando pagamento',
        createdAt: '2021-11-20',
        updatedAt: '2024-01-10',
    },
    {
        id: '5',
        name: 'Closed Business',
        slug: 'closed-business',
        status: 'cancelled',
        plan: 'essential',
        dueDate: '2023-12-01',
        monthlyValue: 349,
        notes: 'Encerrou atividades',
        createdAt: '2022-02-15',
        updatedAt: '2023-12-01',
    },
]

const statusConfig: Record<ClientStatus, { label: string; class: string }> = {
    active: { label: 'Ativo', class: 'badge-success' },
    blocked: { label: 'Bloqueado', class: 'badge-warning' },
    cancelled: { label: 'Cancelado', class: 'badge-danger' },
}

const planConfig: Record<ClientPlan, { label: string }> = {
    essential: { label: 'Essencial' },
    professional: { label: 'Profissional' },
    enterprise: { label: 'Enterprise' },
}

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }).format(new Date(dateString))
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function Clients() {
    const [clients, setClients] = useState<Client[]>(initialClients)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingClient, setEditingClient] = useState<Client | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        status: 'active' as ClientStatus,
        plan: 'essential' as ClientPlan,
        dueDate: '',
        monthlyValue: '',
        notes: '',
    })

    const filteredClients = clients.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.slug.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            status: 'active',
            plan: 'essential',
            dueDate: '',
            monthlyValue: '',
            notes: '',
        })
        setEditingClient(null)
    }

    const handleOpenDialog = (client?: Client) => {
        if (client) {
            setEditingClient(client)
            setFormData({
                name: client.name,
                slug: client.slug,
                status: client.status,
                plan: client.plan,
                dueDate: client.dueDate,
                monthlyValue: client.monthlyValue.toString(),
                notes: client.notes || '',
            })
        } else {
            resetForm()
        }
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        resetForm()
    }

    const handleSubmit = () => {
        const now = new Date().toISOString()

        if (editingClient) {
            setClients(clients.map((c) =>
                c.id === editingClient.id
                    ? {
                        ...c,
                        ...formData,
                        monthlyValue: parseFloat(formData.monthlyValue),
                        updatedAt: now,
                    }
                    : c
            ))
        } else {
            const newClient: Client = {
                id: Date.now().toString(),
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                status: formData.status,
                plan: formData.plan,
                dueDate: formData.dueDate,
                monthlyValue: parseFloat(formData.monthlyValue),
                notes: formData.notes,
                createdAt: now,
                updatedAt: now,
            }
            setClients([...clients, newClient])
        }

        handleCloseDialog()
    }

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            setClients(clients.filter((c) => c.id !== id))
        }
    }

    const activeCount = clients.filter(c => c.status === 'active').length
    const totalMRR = clients
        .filter(c => c.status === 'active')
        .reduce((sum, c) => sum + c.monthlyValue, 0)

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <header className="sticky top-0 z-10 glass px-4 md:px-6 py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                                Clientes
                            </h1>
                            <p className="text-sm text-[hsl(var(--text-secondary))] hidden md:block">
                                Gerencie sua carteira de clientes
                            </p>
                        </div>
                        <button
                            onClick={() => handleOpenDialog()}
                            className="btn-primary text-sm touch-target"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Novo Cliente</span>
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
                            <input
                                type="text"
                                placeholder="Buscar cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-modern pl-10"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as ClientStatus | 'all')}
                            className="input-modern w-auto min-w-[120px]"
                        >
                            <option value="all">Todos</option>
                            <option value="active">Ativos</option>
                            <option value="blocked">Bloqueados</option>
                            <option value="cancelled">Cancelados</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="px-4 md:px-6 py-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[hsl(var(--text-primary))]">{clients.length}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Total</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{activeCount}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Ativos</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-lg font-bold text-[hsl(var(--text-primary))]">{formatCurrency(totalMRR)}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">MRR</p>
                    </div>
                </div>
            </div>

            {/* Client List */}
            <div className="flex-1 px-4 md:px-6 pb-6">
                {/* Desktop Table */}
                <div className="hidden lg:block glass-card rounded-2xl overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Plano</th>
                                <th>Vencimento</th>
                                <th>Valor</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="empty-state">
                                            <div className="empty-state-icon">
                                                <Building2 className="w-6 h-6" />
                                            </div>
                                            <p className="empty-state-title">Nenhum cliente encontrado</p>
                                            <p className="empty-state-description">
                                                Tente ajustar os filtros ou cadastre um novo cliente.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <tr key={client.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--bg-elevated))] to-[hsl(var(--bg-tertiary))] flex items-center justify-center border border-[hsl(var(--border-subtle))]">
                                                    <span className="text-sm font-semibold text-[hsl(var(--text-secondary))]">
                                                        {client.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[hsl(var(--text-primary))]">{client.name}</p>
                                                    <p className="text-sm text-[hsl(var(--text-muted))]">{client.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusConfig[client.status].class)}>
                                                {statusConfig[client.status].label}
                                            </span>
                                        </td>
                                        <td className="text-[hsl(var(--text-secondary))]">
                                            {planConfig[client.plan].label}
                                        </td>
                                        <td className="text-[hsl(var(--text-secondary))]">
                                            {formatDate(client.dueDate)}
                                        </td>
                                        <td className="font-medium text-emerald-400">
                                            {formatCurrency(client.monthlyValue)}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleOpenDialog(client)}
                                                    className="p-2 rounded-lg hover:bg-[hsl(var(--bg-tertiary))] transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3">
                    {filteredClients.length === 0 ? (
                        <div className="glass-card rounded-2xl">
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <p className="empty-state-title">Nenhum cliente encontrado</p>
                                <p className="empty-state-description">
                                    Tente ajustar os filtros ou cadastre um novo cliente.
                                </p>
                            </div>
                        </div>
                    ) : (
                        filteredClients.map((client, index) => (
                            <div
                                key={client.id}
                                className={cn(
                                    "glass-card mobile-card rounded-2xl animate-slide-up",
                                    `stagger-${Math.min(index + 1, 4)}`
                                )}
                                style={{ animationFillMode: 'backwards' }}
                            >
                                <div className="mobile-card-header">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--bg-elevated))] to-[hsl(var(--bg-tertiary))] flex items-center justify-center border border-[hsl(var(--border-subtle))]">
                                            <span className="text-base font-semibold text-[hsl(var(--text-secondary))]">
                                                {client.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="mobile-card-title">{client.name}</p>
                                            <p className="mobile-card-subtitle">{client.slug}</p>
                                        </div>
                                    </div>
                                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap", statusConfig[client.status].class)}>
                                        {statusConfig[client.status].label}
                                    </span>
                                </div>

                                <div className="mobile-card-meta">
                                    <div className="mobile-card-meta-item">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{formatDate(client.dueDate)}</span>
                                    </div>
                                    <div className="mobile-card-meta-item">
                                        <span className="font-medium text-emerald-400">{formatCurrency(client.monthlyValue)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[hsl(var(--border-subtle)/0.5)]">
                                    <span className="text-xs text-[hsl(var(--text-muted))]">
                                        {planConfig[client.plan].label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenDialog(client)}
                                            className="p-2 rounded-lg bg-[hsl(var(--bg-tertiary))] hover:bg-[hsl(var(--bg-elevated))] transition-colors touch-target"
                                        >
                                            <Pencil className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(client.id)}
                                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors touch-target"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                        </button>
                                    </div>
                                </div>
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
                        onClick={handleCloseDialog}
                    />
                    <div className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 animate-slide-up">
                        <div className="glass-card rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[hsl(var(--text-primary))]">
                                    {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
                                </h2>
                                <button
                                    onClick={handleCloseDialog}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--bg-tertiary))] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Nome da Empresa
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Tech Solutions"
                                        className="input-modern"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Slug / ID
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="Ex: tech-solutions"
                                        className="input-modern"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as ClientStatus })}
                                            className="input-modern"
                                        >
                                            <option value="active">Ativo</option>
                                            <option value="blocked">Bloqueado</option>
                                            <option value="cancelled">Cancelado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Plano
                                        </label>
                                        <select
                                            value={formData.plan}
                                            onChange={(e) => setFormData({ ...formData, plan: e.target.value as ClientPlan })}
                                            className="input-modern"
                                        >
                                            <option value="essential">Essencial</option>
                                            <option value="professional">Profissional</option>
                                            <option value="enterprise">Enterprise</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Valor (R$)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.monthlyValue}
                                            onChange={(e) => setFormData({ ...formData, monthlyValue: e.target.value })}
                                            placeholder="0.00"
                                            className="input-modern"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Observações
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Notas adicionais..."
                                        rows={3}
                                        className="input-modern resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleCloseDialog}
                                    className="btn-secondary flex-1"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="btn-primary flex-1"
                                >
                                    {editingClient ? 'Salvar' : 'Cadastrar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
