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
import { Textarea } from '@/components/ui/textarea'
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
    Pencil,
    Trash2,
    Filter,
} from 'lucide-react'
import type { Client, ClientStatus, ClientPlan } from '@/types'

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

const statusConfig: Record<ClientStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
    active: { label: 'Ativo', variant: 'success' },
    blocked: { label: 'Bloqueado', variant: 'warning' },
    cancelled: { label: 'Cancelado', variant: 'danger' },
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
        year: 'numeric',
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
            // Update existing client
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
            // Create new client
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
        <div className="flex flex-col h-full">
            <Header
                title="Carteira de Clientes"
                description="Gerencie seus clientes e contratos"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Total de Clientes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clients.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Clientes Ativos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-400">{activeCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                MRR Total
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalMRR)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-1 gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                            <Input
                                placeholder="Buscar cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ClientStatus | 'all')}>
                            <SelectTrigger className="w-40">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="active">Ativos</SelectItem>
                                <SelectItem value="blocked">Bloqueados</SelectItem>
                                <SelectItem value="cancelled">Cancelados</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleOpenDialog()}>
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Cliente
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingClient
                                        ? 'Atualize as informações do cliente.'
                                        : 'Preencha os dados para cadastrar um novo cliente.'}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Nome da Empresa</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Tech Solutions"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Slug / ID</label>
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="Ex: tech-solutions"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(v) => setFormData({ ...formData, status: v as ClientStatus })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Ativo</SelectItem>
                                                <SelectItem value="blocked">Bloqueado</SelectItem>
                                                <SelectItem value="cancelled">Cancelado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Plano</label>
                                        <Select
                                            value={formData.plan}
                                            onValueChange={(v) => setFormData({ ...formData, plan: v as ClientPlan })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="essential">Essencial</SelectItem>
                                                <SelectItem value="professional">Profissional</SelectItem>
                                                <SelectItem value="enterprise">Enterprise</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Data de Vencimento</label>
                                        <Input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Valor Mensal (R$)</label>
                                        <Input
                                            type="number"
                                            value={formData.monthlyValue}
                                            onChange={(e) => setFormData({ ...formData, monthlyValue: e.target.value })}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Observações</label>
                                    <Textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Notas adicionais sobre o cliente..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={handleCloseDialog}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSubmit}>
                                    {editingClient ? 'Salvar Alterações' : 'Cadastrar'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Clients Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Plano</TableHead>
                                    <TableHead>Vencimento</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-[hsl(var(--muted-foreground))]">
                                            Nenhum cliente encontrado
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredClients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{client.name}</p>
                                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                        {client.slug}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={statusConfig[client.status].variant}>
                                                    {statusConfig[client.status].label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{planConfig[client.plan].label}</TableCell>
                                            <TableCell>{formatDate(client.dueDate)}</TableCell>
                                            <TableCell>{formatCurrency(client.monthlyValue)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleOpenDialog(client)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(client.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </Button>
                                                </div>
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
