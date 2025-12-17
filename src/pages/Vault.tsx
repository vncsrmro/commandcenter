import { useState } from 'react'
import {
    Plus,
    KeyRound,
    Eye,
    EyeOff,
    Copy,
} from 'lucide-react'
import type { Credential } from '@/types'

const initialCredentials: Credential[] = [
    { id: '1', clientId: '1', clientName: 'Tech Solutions', title: 'Painel Admin', username: 'admin@tech.com', password: 'password123', url: 'https://admin.tech.com', createdAt: '', updatedAt: '' },
    { id: '2', clientId: '1', clientName: 'Tech Solutions', title: 'Banco de Dados', username: 'db_admin', password: 'dbpassword', url: '', createdAt: '', updatedAt: '' },
    { id: '3', clientId: '2', clientName: 'StartupX', title: 'AWS Root', username: 'aws_user', password: 'awskeypassword', url: 'https://aws.amazon.com', createdAt: '', updatedAt: '' },
]

export function Vault() {
    const [searchTerm, setSearchTerm] = useState('')
    const [visible, setVisible] = useState<Record<string, boolean>>({})

    const filtered = initialCredentials.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleVis = (id: string) => setVisible(p => ({ ...p, [id]: !p[id] }))

    return (
        <div className="animate-pop max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="app-icon app-icon-gray w-12 h-12 rounded-[14px]">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Cofre</h1>
                        <p className="text-white/60 text-sm">Senhas e Chaves</p>
                    </div>
                </div>
                <button className="btn-glass flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nova
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar List (Desktop) / Main List (Mobile) */}
                <div className="widget col-span-1 md:col-span-1 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-3 bg-white/5 border-b border-white/5">
                        <input
                            className="input-glass bg-black/20 text-sm py-1.5"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filtered.map(cred => (
                            <div key={cred.id} className="p-3 border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                <p className="font-semibold text-sm text-white">{cred.title}</p>
                                <p className="text-xs text-white/50 truncate">{cred.username}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail View (Right Panel) */}
                <div className="widget col-span-1 md:col-span-2 h-[500px] p-6 relative hidden md:flex flex-col items-center justify-center text-center">
                    {/* Placeholder for detail view - In a real app, selection state would drive this */}
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <KeyRound className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-white/40">Selecione uma credencial para ver detalhes</p>
                </div>

                {/* Mobile Detail List fallback (simplify for demo) */}
                <div className="md:hidden space-y-4">
                    {filtered.map(cred => (
                        <div key={cred.id} className="widget p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold">{cred.title}</h3>
                                <span className="text-xs bg-white/10 px-2 py-1 rounded">{cred.clientName}</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 bg-black/20 rounded">
                                    <span className="text-white/50">Usuário</span>
                                    <div className="flex gap-2">
                                        <span>{cred.username}</span>
                                        <Copy className="w-4 h-4 text-white/30" />
                                    </div>
                                </div>
                                <div className="flex justify-between p-2 bg-black/20 rounded">
                                    <span className="text-white/50">Senha</span>
                                    <div className="flex gap-2 items-center">
                                        <span>{visible[cred.id] ? cred.password : '•••••••'}</span>
                                        <button onClick={() => toggleVis(cred.id)}>
                                            {visible[cred.id] ? <EyeOff className="w-4 h-4 text-white/50" /> : <Eye className="w-4 h-4 text-white/50" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
