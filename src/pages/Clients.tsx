import { useState } from 'react'
import {
    Plus,
    Search,
    Building2,
    Calendar,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Trash2,
    Loader2,
    MoreHorizontal,
    Globe,
    AlertTriangle
} from 'lucide-react'
import { useClients } from '@/hooks/useClients'
import { Modal } from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateString: string) {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('pt-BR')
}

export function Clients() {
    const { clients, loading, error, createClient, deleteClient } = useClients()
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        status: 'active' as 'active' | 'blocked' | 'cancelled',
        plan: 'essential' as 'essential' | 'professional' | 'enterprise',
        due_date: new Date().toISOString().split('T')[0],
        monthly_value: 0,
        domains: '', // Comma separated string for input
        notes: ''
    })

    const filtered = clients.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            await createClient({
                ...formData,
                monthly_value: Number(formData.monthly_value),
                domains: formData.domains.split(',').map(d => d.trim()).filter(Boolean)
            })
            setIsModalOpen(false)
            setFormData({
                name: '',
                slug: '',
                status: 'active',
                plan: 'essential',
                due_date: new Date().toISOString().split('T')[0],
                monthly_value: 0,
                domains: '',
                notes: ''
            })
        } catch (err) {
            alert('Erro ao criar cliente. Verifique o console.')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja remover este cliente?')) {
            await deleteClient(id)
        }
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
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        icon={<Plus className="w-4 h-4" />}
                    >
                        <span className="hidden md:inline">Novo</span>
                    </Button>
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
                            <th className="px-4 py-3 font-medium">Domínios</th>
                            <th className="px-4 py-3 font-medium text-right">Vencimento</th>
                            <th className="px-4 py-3 font-medium w-[80px]"></th> // Empty Header
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
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            {client.domains && client.domains.length > 0 ? (
                                                client.domains.map((d, i) => (
                                                    <a key={i} href={`https://${d}`} target="_blank" rel="noreferrer" className="text-xs text-[var(--accent-blue)] hover:underline flex items-center gap-1">
                                                        <Globe className="w-3 h-3" />
                                                        {d}
                                                    </a>
                                                ))
                                            ) : (
                                                <span className="text-xs text-[var(--text-muted)]">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${new Date(client.due_date) < new Date() ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            'text-[#71717a] bg-[#18181b] border-[#27272a]'
                                            }`}>
                                            {new Date(client.due_date) < new Date() && <AlertTriangle className="w-3 h-3" />}
                                            <Calendar className="w-3 h-3" />
                                            Day {new Date(client.due_date).getDate()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right flex gap-1 justify-end">
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDelete(client.id)}
                                            className="h-8 w-8 p-0 text-[#71717a] hover:text-red-500"
                                            title="Remover"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-[#71717a] hover:text-white"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
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
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleDelete(client.id)}
                                        className="h-8 w-8 p-0 text-[#71717a] hover:text-white"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Create Client Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Novo Cliente"
                description="Preencha os dados da empresa para criar um novo tenant."
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                            icon={<Plus className="w-4 h-4" />}
                        >
                            Criar Cliente
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Nome da Empresa"
                            placeholder="Ex: PaperX Inc."
                            value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        />
                        <Input
                            label="Slug / ID"
                            placeholder="Ex: paperx"
                            value={formData.slug}
                            onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Plano"
                            options={[
                                { value: 'essential', label: 'Essencial' },
                                { value: 'profissional', label: 'Profissional' },
                                { value: 'enterprise', label: 'Enterprise' }
                            ]}
                            value={formData.plan}
                            onChange={e => setFormData(p => ({ ...p, plan: e.target.value as 'essential' | 'professional' | 'enterprise' }))}
                        />
                        <Select
                            label="Status"
                            options={[
                                { value: 'active', label: 'Ativo' },
                                { value: 'blocked', label: 'Bloqueado' },
                                { value: 'cancelled', label: 'Cancelado' }
                            ]}
                            value={formData.status}
                            onChange={e => setFormData(p => ({ ...p, status: e.target.value as 'active' | 'blocked' | 'cancelled' }))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Valor Mensal (R$)"
                            type="number"
                            placeholder="0.00"
                            value={formData.monthly_value}
                            onChange={e => setFormData(p => ({ ...p, monthly_value: Number(e.target.value) }))}
                        />
                        <Input
                            label="Data Vencimento"
                            type="date"
                            value={formData.due_date}
                            onChange={e => setFormData(p => ({ ...p, due_date: e.target.value }))}
                        />
                    </div>
                    <Input
                        label="Domínios (separados por vírgula)"
                        placeholder="Ex: app.cliente.com.br, landing.cliente.com"
                        value={formData.domains}
                        onChange={e => setFormData(p => ({ ...p, domains: e.target.value }))}
                    />
                    <Input
                        label="Observações"
                        placeholder="Notas internas..."
                        value={formData.notes}
                        onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    />
                </form>
            </Modal>
        </div>
    )
}
