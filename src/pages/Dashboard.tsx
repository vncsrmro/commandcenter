import {
    ArrowUpRight,
    TrendingUp,
    AlertTriangle,
    Building2,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    Users
} from 'lucide-react'

export function Dashboard() {
    return (
        <div className="space-y-6">

            {/* 1. Header & Quick Status */}
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-white tracking-tight">Visão Geral</h1>
                <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                    <span>Atualizado agora</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[#52525b]" />
                    <span className="text-emerald-500 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Sistema Operacional
                    </span>
                </div>
            </div>

            {/* 2. Critical Alerts (The Pulse) - If any */}
            <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-3 flex items-start gap-4">
                <div className="bg-orange-500/10 p-1.5 rounded">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-orange-200">3 Pendências Financeiras</h3>
                    <p className="text-xs text-orange-200/60 mt-0.5">Faturas vencidas requerem atenção.</p>
                </div>
                <button className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold rounded transition-colors uppercase tracking-wide">
                    Resolver
                </button>
            </div>

            {/* 3. Business KPIs - The "360 View" */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* MRR Card - Hero */}
                <div className="pro-card p-5 md:col-span-2 bg-gradient-to-br from-[#101012] to-[#09090b] border-[#27272a] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-1">Receita Recorrente (MRR)</p>
                            <h2 className="text-3xl font-bold text-white tracking-tight tabular-nums">R$ 12.450</h2>
                        </div>
                        <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +12.5%
                        </div>
                    </div>
                    {/* Simple visual bar chart mock */}
                    <div className="relative z-10 h-16 flex items-end gap-1 mt-auto">
                        {[40, 65, 55, 80, 70, 90, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-[#27272a] hover:bg-blue-600 transition-colors rounded-sm group-hover:first:bg-[#27272a]" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>

                {/* Clients Status */}
                <div className="pro-card p-5 flex flex-col justify-between hover:border-[#3f3f46] transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-1">Carteira Ativa</p>
                            <h2 className="text-2xl font-bold text-white tabular-nums">18</h2>
                        </div>
                        <Users className="w-4 h-4 text-[#52525b]" />
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#71717a]">Novos (mês)</span>
                            <span className="text-white font-medium">+2</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[#71717a]">Churn</span>
                            <span className="text-white font-medium">0%</span>
                        </div>
                        <div className="w-full bg-[#18181b] h-1 rounded-full mt-2">
                            <div className="bg-emerald-500 h-1 rounded-full w-[85%]" />
                        </div>
                    </div>
                </div>

                {/* Financial Health */}
                <div className="pro-card p-5 flex flex-col justify-between hover:border-[#3f3f46] transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-1">Fluxo Previsto</p>
                            <h2 className="text-2xl font-bold text-white tabular-nums">R$ 14.2k</h2>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#52525b]" />
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#71717a]">A Receber</span>
                            <span className="text-emerald-400 font-medium font-mono">R$ 1.290</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[#71717a]">A Pagar</span>
                            <span className="text-red-400 font-medium font-mono">R$ 450</span>
                        </div>
                        <div className="w-full bg-[#18181b] h-1 rounded-full mt-2 overflow-hidden flex">
                            <div className="bg-emerald-500 h-1 w-[70%]" />
                            <div className="bg-red-500 h-1 w-[20%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Operational Lists - High Density */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-white">Últimas Movimentações</h3>
                        <button className="text-[10px] text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wide transition-colors">Ver Extrato</button>
                    </div>
                    <div className="pro-card divide-y divide-[#18181b]">
                        {[
                            { icon: CheckCircle2, color: 'text-emerald-500', title: 'Pagamento Confirmado', client: 'Tech Solutions', desc: 'Mensalidade Jan', value: '+ R$ 599', date: 'Hoje, 14:30' },
                            { icon: Clock, color: 'text-orange-500', title: 'Aguardando Pagamento', client: 'Agência Digital', desc: 'Setup Inicial', value: 'R$ 1.500', date: 'Hoje, 09:15' },
                            { icon: Building2, color: 'text-blue-500', title: 'Novo Contrato', client: 'Startup X', desc: 'Plano Pro', value: 'Assinado', date: 'Ontem' },
                            { icon: CheckCircle2, color: 'text-emerald-500', title: 'Pagamento Confirmado', client: 'Consultoria Y', desc: 'Mensalidade Jan', value: '+ R$ 890', date: 'Ontem' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 flex items-center justify-between hover:bg-[#18181b] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-md bg-[#18181b] group-hover:bg-[#27272a] transition-colors`}>
                                        <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.client}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] text-[#71717a] font-medium uppercase tracking-wide">{item.title}</p>
                                            <span className="w-0.5 h-0.5 rounded-full bg-[#3f3f46]" />
                                            <p className="text-[10px] text-[#52525b]">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-mono font-medium text-white block">{item.value}</span>
                                    <span className="text-[10px] text-[#52525b]">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Shortcuts */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-white">Ações Rápidas</h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                        <button className="pro-card p-3 hover:bg-[#18181b] hover:border-[#3f3f46] transition-all text-left flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-white block">Novo Cliente</span>
                                <span className="text-[10px] text-[#71717a]">Cadastro completo</span>
                            </div>
                        </button>
                        <button className="pro-card p-3 hover:bg-[#18181b] hover:border-[#3f3f46] transition-all text-left flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-white block">Nova Cobrança</span>
                                <span className="text-[10px] text-[#71717a]">Link de pagamento</span>
                            </div>
                        </button>
                        <button className="pro-card p-3 hover:bg-[#18181b] hover:border-[#3f3f46] transition-all text-left flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded bg-[#18181b] flex items-center justify-center text-[#52525b] group-hover:bg-[#3f3f46] group-hover:text-white transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-white block">Mais Ações</span>
                                <span className="text-[10px] text-[#71717a]">Ver todas</span>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
