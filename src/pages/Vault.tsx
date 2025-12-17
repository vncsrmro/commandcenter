import { useState } from 'react'
import {
    Plus,
    Search,
    Lock,
    Eye,
    EyeOff,
    Copy,
    Globe,
    MoreHorizontal,
    Loader2
} from 'lucide-react'
import { useVault } from '@/hooks/useVault'

export function Vault() {
    const { credentials, loading, error } = useVault()
    const [searchTerm, setSearchTerm] = useState('')
    const [visible, setVisible] = useState<Record<string, boolean>>({})

    const filtered = credentials.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleVis = (id: string) => setVisible(p => ({ ...p, [id]: !p[id] }))

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert('Copiado!')
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
                    <h1 className="text-2xl font-bold text-white tracking-tight">Cofre de Senhas</h1>
                    <p className="text-sm text-[#a1a1aa] mt-0.5">Credenciais seguras e chaves de API.</p>
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
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Nova Credencial</span>
                    </button>
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
                            <div className="w-10 h-10 rounded bg-[#27272a] flex items-center justify-center text-[#71717a] group-hover:text-blue-400 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-sm">{cred.title}</h3>
                                <p className="text-xs text-[#71717a] flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
                                    {/* Assuming we might want to fetch Client Name later, for now just static or hidden */}
                                    <span className="opacity-50">Vinculado</span>
                                </p>
                            </div>
                        </div>

                        {/* Details (Username/URL) */}
                        <div className="w-full md:w-1/3 text-sm text-[#a1a1aa]">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#52525b] text-xs font-bold uppercase w-12">User</span>
                                <span className="font-mono text-white select-all">{cred.username}</span>
                            </div>
                            {cred.url && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[#52525b] text-xs font-bold uppercase w-12">URL</span>
                                    <a href={cred.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate max-w-[150px] flex items-center gap-1">
                                        {cred.url} <Globe className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Password Actions */}
                        <div className="w-full md:w-auto flex items-center justify-end gap-2 bg-[#09090b] p-2 rounded-lg border border-[#27272a]">
                            <span className="font-mono text-sm text-white min-w-[120px] text-right px-2">
                                {/* For now showing encrypted or placeholder if no decrypt logic */}
                                {visible[cred.id] ? cred.password_encrypted : '••••••••••••'}
                            </span>
                            <div className="flex border-l border-[#27272a] pl-2 gap-1">
                                <button onClick={() => toggleVis(cred.id)} className="p-1.5 hover:bg-[#27272a] rounded text-[#71717a] hover:text-white transition-colors" title="Toggle visibility">
                                    {visible[cred.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button onClick={() => copyToClipboard(cred.password_encrypted)} className="p-1.5 hover:bg-[#27272a] rounded text-[#71717a] hover:text-white transition-colors" title="Copy password">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile/Desktop More Actions */}
                        <button className="hidden md:block absolute top-4 right-4 text-[#3f3f46] hover:text-white transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>

                    </div>
                ))}
            </div>

        </div>
    )
}
