import { useState } from 'react'
import {
    Plus,
    Search,
    Copy,
    Eye,
    EyeOff,
    Pencil,
    Trash2,
    Key,
    Globe,
    User,
    Lock,
    Check,
    X,
    Shield,
} from 'lucide-react'
import type { Credential } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const initialCredentials: Credential[] = [
    {
        id: '1',
        clientId: '1',
        clientName: 'Tech Solutions',
        title: 'Painel Admin',
        username: 'admin@techsolutions.com',
        password: 'S3cur3P@ssw0rd!',
        url: 'https://admin.techsolutions.com',
        notes: 'Acesso principal ao painel',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10',
    },
    {
        id: '2',
        clientId: '1',
        clientName: 'Tech Solutions',
        title: 'Banco de Dados',
        username: 'db_admin',
        password: 'Db@dmin2024!',
        url: 'mysql://db.techsolutions.com:3306',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10',
    },
    {
        id: '3',
        clientId: '2',
        clientName: 'Digital Agency',
        title: 'Hostinger SSH',
        username: 'u123456789',
        password: 'H0st!ng3r@2024',
        url: 'ssh://premium123.hostinger.com',
        notes: 'Porta 22',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
    },
    {
        id: '4',
        clientId: '3',
        clientName: 'StartupX',
        title: 'AWS Console',
        username: 'startupx-admin',
        password: 'Aws@StartupX!2024',
        url: 'https://console.aws.amazon.com',
        notes: 'Conta principal - Região us-east-1',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05',
    },
]

const mockClients = [
    { id: '1', name: 'Tech Solutions' },
    { id: '2', name: 'Digital Agency' },
    { id: '3', name: 'StartupX' },
    { id: '4', name: 'Old Corp' },
]

export function Vault() {
    const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)
    const [searchTerm, setSearchTerm] = useState('')
    const [clientFilter, setClientFilter] = useState<string>('all')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({})
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        clientId: '',
        title: '',
        username: '',
        password: '',
        url: '',
        notes: '',
    })

    const filteredCredentials = credentials.filter((cred) => {
        const matchesSearch =
            cred.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cred.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cred.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesClient = clientFilter === 'all' || cred.clientId === clientFilter
        return matchesSearch && matchesClient
    })

    const groupedCredentials = filteredCredentials.reduce((acc, cred) => {
        const key = cred.clientName || 'Sem Cliente'
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(cred)
        return acc
    }, {} as Record<string, Credential[]>)

    const resetForm = () => {
        setFormData({
            clientId: '',
            title: '',
            username: '',
            password: '',
            url: '',
            notes: '',
        })
        setEditingCredential(null)
    }

    const handleOpenDialog = (credential?: Credential) => {
        if (credential) {
            setEditingCredential(credential)
            setFormData({
                clientId: credential.clientId,
                title: credential.title,
                username: credential.username,
                password: credential.password,
                url: credential.url || '',
                notes: credential.notes || '',
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
        const client = mockClients.find((c) => c.id === formData.clientId)

        if (editingCredential) {
            setCredentials(
                credentials.map((c) =>
                    c.id === editingCredential.id
                        ? {
                            ...c,
                            ...formData,
                            clientName: client?.name,
                            updatedAt: now,
                        }
                        : c
                )
            )
        } else {
            const newCredential: Credential = {
                id: Date.now().toString(),
                clientId: formData.clientId,
                clientName: client?.name,
                title: formData.title,
                username: formData.username,
                password: formData.password,
                url: formData.url,
                notes: formData.notes,
                createdAt: now,
                updatedAt: now,
            }
            setCredentials([...credentials, newCredential])
        }

        handleCloseDialog()
    }

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir esta credencial?')) {
            setCredentials(credentials.filter((c) => c.id !== id))
        }
    }

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const maskPassword = (password: string) => {
        return '•'.repeat(Math.min(password.length, 12))
    }

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <header className="sticky top-0 z-10 glass px-4 md:px-6 py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                                Cofre de Senhas
                            </h1>
                            <p className="text-sm text-[hsl(var(--text-secondary))] hidden md:block">
                                Credenciais de acesso dos clientes
                            </p>
                        </div>
                        <button
                            onClick={() => handleOpenDialog()}
                            className="btn-primary text-sm touch-target"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Nova Credencial</span>
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
                            <input
                                type="text"
                                placeholder="Buscar credencial..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-modern pl-10"
                            />
                        </div>
                        <select
                            value={clientFilter}
                            onChange={(e) => setClientFilter(e.target.value)}
                            className="input-modern w-auto min-w-[140px]"
                        >
                            <option value="all">Todos</option>
                            {mockClients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            {/* Summary */}
            <div className="px-4 md:px-6 py-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[hsl(var(--text-primary))]">{credentials.length}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Credenciais</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{Object.keys(groupedCredentials).length}</p>
                        <p className="text-xs text-[hsl(var(--text-muted))]">Clientes</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center flex flex-col items-center justify-center">
                        <Shield className="w-6 h-6 text-violet-400" />
                        <p className="text-xs text-[hsl(var(--text-muted))] mt-1">Seguro</p>
                    </div>
                </div>
            </div>

            {/* Credentials List */}
            <div className="flex-1 px-4 md:px-6 pb-6 space-y-6">
                {Object.keys(groupedCredentials).length === 0 ? (
                    <div className="glass-card rounded-2xl">
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <Key className="w-6 h-6" />
                            </div>
                            <p className="empty-state-title">Nenhuma credencial encontrada</p>
                            <p className="empty-state-description">
                                Adicione credenciais de acesso para seus clientes.
                            </p>
                        </div>
                    </div>
                ) : (
                    Object.entries(groupedCredentials).map(([clientName, creds]) => (
                        <div key={clientName} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center">
                                    <Key className="w-4 h-4 text-violet-400" />
                                </div>
                                <h3 className="font-medium text-[hsl(var(--text-primary))]">{clientName}</h3>
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[hsl(var(--bg-tertiary))] text-[hsl(var(--text-muted))]">
                                    {creds.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {creds.map((cred, index) => (
                                    <div
                                        key={cred.id}
                                        className={cn(
                                            "glass-card rounded-2xl p-4 animate-slide-up",
                                            `stagger-${Math.min(index + 1, 4)}`
                                        )}
                                        style={{ animationFillMode: 'backwards' }}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-semibold text-[hsl(var(--text-primary))]">{cred.title}</h4>
                                                {cred.url && (
                                                    <a
                                                        href={cred.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-[hsl(var(--accent-primary))] hover:underline flex items-center gap-1 mt-1"
                                                    >
                                                        <Globe className="w-3 h-3" />
                                                        <span className="truncate max-w-[180px]">{cred.url}</span>
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleOpenDialog(cred)}
                                                    className="p-1.5 rounded-lg hover:bg-[hsl(var(--bg-tertiary))] transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5 text-[hsl(var(--text-muted))]" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cred.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Username */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--bg-tertiary))] mb-2">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <User className="w-4 h-4 text-[hsl(var(--text-muted))] shrink-0" />
                                                <span className="text-sm font-mono truncate">{cred.username}</span>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(cred.username, `user-${cred.id}`)}
                                                className="p-1.5 rounded-lg hover:bg-[hsl(var(--bg-elevated))] transition-colors shrink-0"
                                            >
                                                {copiedId === `user-${cred.id}` ? (
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Password */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--bg-tertiary))]">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <Lock className="w-4 h-4 text-[hsl(var(--text-muted))] shrink-0" />
                                                <span className="text-sm font-mono">
                                                    {visiblePasswords[cred.id]
                                                        ? cred.password
                                                        : maskPassword(cred.password)}
                                                </span>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                <button
                                                    onClick={() => togglePasswordVisibility(cred.id)}
                                                    className="p-1.5 rounded-lg hover:bg-[hsl(var(--bg-elevated))] transition-colors"
                                                >
                                                    {visiblePasswords[cred.id] ? (
                                                        <EyeOff className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                                    ) : (
                                                        <Eye className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(cred.password, `pass-${cred.id}`)}
                                                    className="p-1.5 rounded-lg hover:bg-[hsl(var(--bg-elevated))] transition-colors"
                                                >
                                                    {copiedId === `pass-${cred.id}` ? (
                                                        <Check className="w-4 h-4 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        {cred.notes && (
                                            <p className="text-xs text-[hsl(var(--text-muted))] mt-3 italic">
                                                {cred.notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
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
                                    {editingCredential ? 'Editar Credencial' : 'Nova Credencial'}
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
                                        Cliente
                                    </label>
                                    <select
                                        value={formData.clientId}
                                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                        className="input-modern"
                                    >
                                        <option value="">Selecione o cliente</option>
                                        {mockClients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ex: Painel Admin, SSH..."
                                        className="input-modern"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Usuário
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="username"
                                            className="input-modern"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="••••••••"
                                            className="input-modern"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        URL
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://..."
                                        className="input-modern"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--text-secondary))] mb-2">
                                        Notas
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Informações adicionais..."
                                        rows={3}
                                        className="input-modern resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={handleCloseDialog} className="btn-secondary flex-1">
                                    Cancelar
                                </button>
                                <button onClick={handleSubmit} className="btn-primary flex-1">
                                    {editingCredential ? 'Salvar' : 'Adicionar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
