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
import { Button } from '@/components/ui/button'

export function Dashboard() {
    return (
        <div className="space-y-6 animate-enter">

            {/* 1. Header & Quick Status */}
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Visão Geral</h1>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>Atualizado agora</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[var(--text-muted)]" />
                    <span className="text-[var(--accent-emerald)] flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
                        Sistema Operacional
                    </span>
                </div>
            </div>

            {/* 2. Critical Alerts (The Pulse) */}
            <div className="bg-gradient-to-r from-[var(--accent-orange)]/10 to-transparent border border-[var(--accent-orange)]/10 rounded-lg p-3 flex items-start gap-4 backdrop-blur-sm">
                <div className="bg-[var(--accent-orange)]/10 p-1.5 rounded-md shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                    <AlertTriangle className="w-4 h-4 text-[var(--accent-orange)]" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-orange-200">3 Pendências Financeiras</h3>
                    <p className="text-xs text-orange-200/60 mt-0.5">Faturas vencidas requerem atenção imediata.</p>
                </div>
                <Button variant="danger" className="text-xs px-3 py-1.5 h-auto">
                    Resolver
                </Button>
            </div>

            {/* 3. Business KPIs - The "360 View" */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* MRR Card - Hero */}
                <div className="pro-card p-6 md:col-span-2 relative group isolate">
                    {/* Strong Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/10 via-[var(--accent-purple)]/5 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[var(--accent-blue)] text-[10px] font-bold uppercase tracking-widest mb-1.5">Receita Recorrente (MRR)</p>
                            <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight tabular-nums drop-shadow-lg">R$ 12.450</h2>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1 shadow-lg shadow-emerald-900/20">
                            <TrendingUp className="w-3 h-3" />
                            +12.5%
                        </div>
                    </div>
                    {/* Visual bar chart */}
                    <div className="relative z-10 h-24 flex items-end gap-1.5 mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                        {[35, 45, 40, 60, 55, 75, 65, 85, 80, 95, 90, 100].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-[var(--accent-blue)] to-blue-400 rounded-sm shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-500 group-hover:scale-y-110 origin-bottom"
                                style={{ height: `${h}%`, opacity: 0.3 + (i * 0.05) }}
                            />
                        ))}
                    </div>
                </div>

                {/* Clients Status */}
                <div className="pro-card p-5 flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider mb-1">Carteira Ativa</p>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] tabular-nums group-hover:text-[var(--accent-blue)] transition-colors">18</h2>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--bg-surface)] group-hover:bg-[var(--accent-blue)]/10 transition-colors">
                            <Users className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-blue)] transition-colors" />
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">Novos (mês)</span>
                            <span className="text-[var(--text-primary)] font-medium">+2</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">Churn</span>
                            <span className="text-[var(--text-primary)] font-medium">0%</span>
                        </div>
                        <div className="w-full bg-[var(--bg-surface-hover)] h-1 rounded-full mt-2 relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-[var(--accent-emerald)] w-[85%] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>
                </div>

                {/* Financial Health */}
                <div className="pro-card p-5 flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider mb-1">Fluxo Previsto</p>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] tabular-nums group-hover:text-[var(--accent-purple)] transition-colors">R$ 14.2k</h2>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--bg-surface)] group-hover:bg-[var(--accent-purple)]/10 transition-colors">
                            <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-purple)] transition-colors" />
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">A Receber</span>
                            <span className="text-emerald-400 font-medium font-mono">R$ 1.290</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">A Pagar</span>
                            <span className="text-red-400 font-medium font-mono">R$ 450</span>
                        </div>
                        <div className="w-full bg-[var(--bg-surface-hover)] h-1 rounded-full mt-2 overflow-hidden flex">
                            <div className="bg-[var(--accent-emerald)] h-full w-[70%]" />
                            <div className="bg-red-500 h-full w-[20%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Operational Lists - High Density */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Últimas Movimentações</h3>
                        <Button variant="ghost" className="text-[10px] font-bold uppercase h-auto py-1 px-2 text-[var(--accent-blue)] hover:text-blue-400">
                            Ver Extrato
                        </Button>
                    </div>
                    <div className="pro-card divide-y divide-[var(--border-subtle)]">
                        {[
                            { icon: CheckCircle2, color: 'text-[var(--accent-emerald)]', bg: 'bg-[var(--accent-emerald)]/10', title: 'Pagamento Confirmado', client: 'Tech Solutions', desc: 'Mensalidade Jan', value: '+ R$ 599', date: 'Hoje, 14:30' },
                            { icon: Clock, color: 'text-[var(--accent-orange)]', bg: 'bg-[var(--accent-orange)]/10', title: 'Aguardando Pagamento', client: 'Agência Digital', desc: 'Setup Inicial', value: 'R$ 1.500', date: 'Hoje, 09:15' },
                            { icon: Building2, color: 'text-[var(--accent-blue)]', bg: 'bg-[var(--accent-blue)]/10', title: 'Novo Contrato', client: 'Startup X', desc: 'Plano Pro', value: 'Assinado', date: 'Ontem' },
                            { icon: CheckCircle2, color: 'text-[var(--accent-emerald)]', bg: 'bg-[var(--accent-emerald)]/10', title: 'Pagamento Confirmado', client: 'Consultoria Y', desc: 'Mensalidade Jan', value: '+ R$ 890', date: 'Ontem' },
                        ].map((item, i) => (
                            <div key={i} className="p-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.bg} border border-white/5 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">{item.client}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">{item.title}</p>
                                            <span className="w-0.5 h-0.5 rounded-full bg-[var(--border-highlight)]" />
                                            <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-mono font-bold text-[var(--text-primary)] block tracking-tight">{item.value}</span>
                                    <span className="text-[10px] text-[var(--text-muted)]">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Shortcuts */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Ações Rápidas</h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                        <button className="pro-card p-4 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all text-left flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-sm font-bold text-[var(--text-primary)] block group-hover:text-[var(--accent-blue)] transition-colors">Novo Cliente</span>
                                <span className="text-[10px] text-[var(--text-secondary)]">Cadastro completo</span>
                            </div>
                        </button>

                        <button className="pro-card p-4 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all text-left flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-sm font-bold text-[var(--text-primary)] block group-hover:text-emerald-400 transition-colors">Nova Cobrança</span>
                                <span className="text-[10px] text-[var(--text-secondary)]">Link de pagamento</span>
                            </div>
                        </button>

                        <button className="pro-card p-4 hover:border-[var(--border-highlight)] transition-all text-left flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-sm font-bold text-[var(--text-primary)] block">Mais Ações</span>
                                <span className="text-[10px] text-[var(--text-secondary)]">Ver todas</span>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
