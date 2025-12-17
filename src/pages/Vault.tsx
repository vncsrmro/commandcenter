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
} from 'lucide-react'
import type { Credential } from '@/types'

// Mock data with client names
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

    // Form state
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

    // Group by client
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
        <div className="flex flex-col h-full">
            <Header
                title="Cofre de Senhas"
                description="Gerencie credenciais de acesso dos clientes"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Total de Credenciais
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{credentials.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Clientes com Credenciais
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-400">
                                {Object.keys(groupedCredentials).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Última Atualização
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Hoje</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-1 gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                            <Input
                                placeholder="Buscar credencial..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={clientFilter} onValueChange={setClientFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filtrar por cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os clientes</SelectItem>
                                {mockClients.map((client) => (
                                    <SelectItem key={client.id} value={client.id}>
                                        {client.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleOpenDialog()}>
                                <Plus className="w-4 h-4 mr-2" />
                                Nova Credencial
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCredential ? 'Editar Credencial' : 'Nova Credencial'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingCredential
                                        ? 'Atualize as informações da credencial.'
                                        : 'Adicione uma nova credencial de acesso.'}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Cliente</label>
                                    <Select
                                        value={formData.clientId}
                                        onValueChange={(v) => setFormData({ ...formData, clientId: v })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockClients.map((client) => (
                                                <SelectItem key={client.id} value={client.id}>
                                                    {client.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Título</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ex: Painel Admin, SSH, Banco de Dados..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Usuário</label>
                                        <Input
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="username ou email"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Senha</label>
                                        <Input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">URL</label>
                                    <Input
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Notas</label>
                                    <Textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Informações adicionais..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={handleCloseDialog}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSubmit}>
                                    {editingCredential ? 'Salvar Alterações' : 'Adicionar'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Credentials Grid */}
                <div className="space-y-6">
                    {Object.keys(groupedCredentials).length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-[hsl(var(--muted-foreground))]">
                                Nenhuma credencial encontrada
                            </CardContent>
                        </Card>
                    ) : (
                        Object.entries(groupedCredentials).map(([clientName, creds]) => (
                            <div key={clientName} className="space-y-3">
                                <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                                    <Key className="w-4 h-4" />
                                    {clientName}
                                    <Badge variant="secondary">{creds.length}</Badge>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {creds.map((cred) => (
                                        <Card key={cred.id} className="hover:border-emerald-500/30 transition-colors">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <CardTitle className="text-base">{cred.title}</CardTitle>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleOpenDialog(cred)}
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleDelete(cred.id)}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {/* Username */}
                                                <div className="flex items-center justify-between p-2 rounded-md bg-[hsl(var(--secondary))]/50">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                                        <span className="text-sm font-mono">{cred.username}</span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => copyToClipboard(cred.username, `user-${cred.id}`)}
                                                    >
                                                        {copiedId === `user-${cred.id}` ? (
                                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                        ) : (
                                                            <Copy className="w-3.5 h-3.5" />
                                                        )}
                                                    </Button>
                                                </div>

                                                {/* Password */}
                                                <div className="flex items-center justify-between p-2 rounded-md bg-[hsl(var(--secondary))]/50">
                                                    <div className="flex items-center gap-2">
                                                        <Lock className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                                        <span className="text-sm font-mono">
                                                            {visiblePasswords[cred.id]
                                                                ? cred.password
                                                                : maskPassword(cred.password)}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => togglePasswordVisibility(cred.id)}
                                                        >
                                                            {visiblePasswords[cred.id] ? (
                                                                <EyeOff className="w-3.5 h-3.5" />
                                                            ) : (
                                                                <Eye className="w-3.5 h-3.5" />
                                                            )}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => copyToClipboard(cred.password, `pass-${cred.id}`)}
                                                        >
                                                            {copiedId === `pass-${cred.id}` ? (
                                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* URL */}
                                                {cred.url && (
                                                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                                        <Globe className="w-4 h-4" />
                                                        <a
                                                            href={cred.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:text-emerald-400 transition-colors truncate"
                                                        >
                                                            {cred.url}
                                                        </a>
                                                    </div>
                                                )}

                                                {/* Notes */}
                                                {cred.notes && (
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))] italic">
                                                        {cred.notes}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
