import { Link } from 'react-router-dom'
import {
    Users,
    KeyRound,
    DollarSign,
    Settings,
    TrendingUp,
    Activity,
    AlertCircle,
    ArrowUpRight,
    ShieldCheck
} from 'lucide-react'

// Mock Data for Command Center
const recentActivity = [
    { id: 1, type: 'payment', title: 'Pagamento Recebido', desc: 'Tech Solutions • R$ 599', time: '18:05', icon: DollarSign, color: 'text-green-400' },
    { id: 2, type: 'client', title: 'Novo Cliente', desc: 'Digital Agency iniciou plano', time: '15:30', icon: Users, color: 'text-blue-400' },
    { id: 3, type: 'alert', title: 'Senha Expirando', desc: 'Update no cofre necessário', time: 'Ontem', icon: KeyRound, color: 'text-orange-400' },
]

export function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* 1. Profile / Welcome Widget */}
            <div className="widget col-span-1 p-6 flex flex-col justify-between relative overflow-hidden group min-h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Olá, Vinicius</h2>
                    <p className="text-sm text-[var(--text-secondary)]">PaperX Admin</p>
                </div>
                <div className="mt-4">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Sistema Operacional</span>
                    </div>
                    <p className="text-xs text-white/40">Todos os serviços online</p>
                </div>
            </div>

            {/* 2. Main Stats Widget (Financial Focus) */}
            <div className="widget col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                    <div>
                        <p className="text-blue-300 font-medium text-sm mb-1 uppercase tracking-wider">Receita Recorrente (MRR)</p>
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">R$ 12.450</h3>
                    </div>
                    <div className="bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-bold text-xs">+12% este mês</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 z-10">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-white/40 text-[10px] uppercase font-bold">Ativos</p>
                        <p className="text-xl font-semibold text-white mt-1">18</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-white/40 text-[10px] uppercase font-bold">Pendentes</p>
                        <p className="text-xl font-semibold text-orange-400 mt-1">3</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-white/40 text-[10px] uppercase font-bold">Churn</p>
                        <p className="text-xl font-semibold text-red-400 mt-1">0%</p>
                    </div>
                </div>
            </div>

            {/* 3. Navigation Grid (The "Apps") */}
            <div className="widget col-span-1 md:col-span-3 lg:col-span-1 p-6">
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-y-6 gap-x-4">
                    <Link to="/clients" className="app-grid-item group">
                        <div className="app-icon app-icon-blue group-hover:scale-105 transition-transform shadow-blue-900/20">
                            <Users />
                        </div>
                        <span className="app-label">Clientes</span>
                    </Link>

                    <Link to="/vault" className="app-grid-item group">
                        <div className="app-icon app-icon-gray group-hover:scale-105 transition-transform">
                            <KeyRound />
                        </div>
                        <span className="app-label">Cofre</span>
                    </Link>

                    <Link to="/financial" className="app-grid-item group">
                        <div className="app-icon app-icon-green group-hover:scale-105 transition-transform shadow-green-900/20">
                            <DollarSign />
                        </div>
                        <span className="app-label">Finanças</span>
                    </Link>

                    <Link to="/settings" className="app-grid-item group">
                        <div className="app-icon app-icon-gray group-hover:scale-105 transition-transform bg-gradient-to-b from-gray-600 to-gray-700">
                            <Settings />
                        </div>
                        <span className="app-label">Ajustes</span>
                    </Link>
                </div>
            </div>

            {/* 4. Recent Activity Feed */}
            <div className="widget col-span-1 md:col-span-2 lg:col-span-2 flex flex-col min-h-[250px]">
                <div className="widget-header">
                    <div className="widget-title text-white">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span>Atividade Recente</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Hoje</span>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-2">
                    {recentActivity.map((item) => (
                        <div key={item.id} className="glass-list-item group">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{item.title}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                                </div>
                            </div>
                            <span className="text-xs text-[var(--text-tertiary)] font-medium bg-white/5 px-2 py-1 rounded-md">{item.time}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                    <button className="w-full py-2 text-xs font-semibold text-white/50 hover:text-white transition-colors uppercase tracking-wider">
                        Ver histórico completo
                    </button>
                </div>
            </div>

            {/* 5. Quick Actions / Alerts */}
            <div className="widget col-span-1 md:col-span-1 lg:col-span-2 p-6 flex flex-col justify-center relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 animate-pulse">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">3 Pendências</h3>
                        <p className="text-xs text-white/50">Ações necessárias hoje</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 performant-hover rounded-xl text-left transition-colors border border-white/5">
                        <span className="text-sm font-medium text-white">Cobrar Fatura #4023</span>
                        <ArrowUpRight className="w-4 h-4 text-white/30" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 performant-hover rounded-xl text-left transition-colors border border-white/5">
                        <span className="text-sm font-medium text-white">Renovar Domínio X</span>
                        <ArrowUpRight className="w-4 h-4 text-white/30" />
                    </button>
                </div>
            </div>

        </div>
    )
}
