import { useState } from 'react'
import {
    Plus,
    Search,
    Lock,
    Eye,
    EyeOff,
    Copy,
    Globe,
    Loader2,
    Trash2
} from 'lucide-react'
import { useVault } from '@/hooks/useVault'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Vault() {
    const { credentials, loading, error, createCredential, deleteCredential } = useVault()
    const [searchTerm, setSearchTerm] = useState('')
    const [visible, setVisible] = useState<Record<string, boolean>>({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        username: '',
        password_encrypted: '',
        url: '',
        notes: ''
    })

    const filtered = credentials.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleVis = (id: string) => setVisible(p => ({ ...p, [id]: !p[id] }))

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        // Ideally show a toast, for now alert is minimal
        alert('Senha copiada!')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            await createCredential(formData)
            setIsModalOpen(false)
            setFormData({ title: '', username: '', password_encrypted: '', url: '', notes: '' })
        } catch (err) {
            alert('Erro ao criar credencial')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja apagar esta credencial?')) {
            await deleteCredential(id)
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
                Erro ao carregar cofre: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-enter">

            {/* 1. Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Cofre de Senhas</h1>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">Credenciais seguras (criptografia de ponta a ponta).</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a] group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar chaves..."
                            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-blue-500/50 transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        icon={<Plus className="w-4 h-4" />}
                    >
                        <span className="hidden md:inline">Nova Credencial</span>
                    </Button>
                </div>
            </div>

            {/* 2. Credentials List */}
            <div className="grid grid-cols-1 gap-3">
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-[#52525b]">
                        Nenhuma credencial segura encontrada.
                    </div>
                )}

                {filtered.map(cred => (
                    <div key={cred.id} className="pro-card p-4 hover:border-[#3f3f46] transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                        {/* Icon & Title */}
                        <div className="flex items-center gap-4 w-full md:w-1/3">
                            <div className="w-10 h-10 rounded bg-[#18181b] flex items-center justify-center text-[#71717a] group-hover:text-blue-400 transition-colors ring-1 ring-[#27272a]">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-sm">{cred.title}</h3>
                                <p className="text-xs text-[#71717a] flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
                                    <span className="opacity-50">Vinculado</span>
                                </p>
                            </div>
                        </div>

                        {/* Details (Username/URL) */}
                        <div className="w-full md:w-1/3 text-sm text-[#a1a1aa]">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#52525b] text-[10px] font-bold uppercase w-10">User</span>
                                <span className="font-mono text-white select-all">{cred.username}</span>
                            </div>
                            {cred.url && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[#52525b] text-[10px] font-bold uppercase w-10">URL</span>
                                    <a href={cred.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate max-w-[150px] flex items-center gap-1">
                                        {cred.url} <Globe className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Password Actions */}
                        <div className="w-full md:w-auto flex items-center justify-end gap-2 bg-[#09090b]/50 p-1.5 rounded-lg border border-[#27272a] backdrop-blur-sm">
                            <span className="font-mono text-xs text-white min-w-[100px] text-right px-2 py-1">
                                {visible[cred.id] ? cred.password_encrypted : '••••••••••••'}
                            </span>
                            <div className="flex border-l border-[#27272a] pl-1 gap-1">
                                <Button variant="ghost" onClick={() => toggleVis(cred.id)} className="h-7 w-7 p-0" title="Toggle visibility">
                                    {visible[cred.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </Button>
                                <Button variant="ghost" onClick={() => copyToClipboard(cred.password_encrypted)} className="h-7 w-7 p-0" title="Copy password">
                                    <Copy className="w-3.5 h-3.5" />
                                </Button>
                                <Button variant="ghost" onClick={() => handleDelete(cred.id)} className="h-7 w-7 p-0 text-red-500 hover:bg-red-500/10" title="Delete">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Create Credential Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Credencial"
                description="Armazene senhas e chaves de acesso com segurança."
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
                            icon={<Lock className="w-4 h-4" />}
                        >
                            Salvar Credencial
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input
                        label="Título / Serviço"
                        placeholder="Ex: AWS Console"
                        value={formData.title}
                        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Usuário / Email"
                            placeholder="admin@paperx.io"
                            value={formData.username}
                            onChange={e => setFormData(p => ({ ...p, username: e.target.value }))}
                        />
                        <Input
                            label="Senha / Chave"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password_encrypted}
                            onChange={e => setFormData(p => ({ ...p, password_encrypted: e.target.value }))}
                        />
                    </div>
                    <Input
                        label="URL de Login"
                        placeholder="https://console.aws.amazon.com"
                        value={formData.url}
                        onChange={e => setFormData(p => ({ ...p, url: e.target.value }))}
                    />
                    <Input
                        label="Notas"
                        placeholder="Detalhes adicionais..."
                        value={formData.notes}
                        onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    />
                </form>
            </Modal>

        </div>
    )
}
