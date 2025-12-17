import {
    Users,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle2,
    UserPlus,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    ChevronRight,
} from 'lucide-react'
import type { DashboardMetrics, ActivityItem, Client } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const metrics: DashboardMetrics = {
    totalClients: 24,
    activeClients: 18,
    mrr: 12450,
    pendingPayments: 3,
}

const recentActivity: ActivityItem[] = [
    {
        id: '1',
        type: 'payment_received',
        description: 'Pagamento recebido de Tech Solutions',
        timestamp: '2024-01-15T10:30:00',
    },
    {
        id: '2',
        type: 'client_created',
        description: 'Novo cliente cadastrado: Digital Agency',
        timestamp: '2024-01-15T09:15:00',
    },
    {
        id: '3',
        type: 'client_blocked',
        description: 'Cliente bloqueado: Old Corp',
        timestamp: '2024-01-14T16:45:00',
    },
    {
        id: '4',
        type: 'credential_added',
        description: 'Credencial adicionada: StartupX',
        timestamp: '2024-01-14T14:20:00',
    },
]

const upcomingDueDates: Pick<Client, 'id' | 'name' | 'dueDate' | 'monthlyValue'>[] = [
    { id: '1', name: 'Tech Solutions', dueDate: '2024-01-20', monthlyValue: 599 },
    { id: '2', name: 'Digital Agency', dueDate: '2024-01-22', monthlyValue: 899 },
    { id: '3', name: 'StartupX', dueDate: '2024-01-25', monthlyValue: 349 },
]

function getActivityIcon(type: ActivityItem['type']) {
    const iconClass = "w-4 h-4"
    switch (type) {
        case 'payment_received':
            return <CreditCard className={cn(iconClass, "text-emerald-400")} />
        case 'client_created':
            return <UserPlus className={cn(iconClass, "text-blue-400")} />
        case 'client_blocked':
            return <AlertCircle className={cn(iconClass, "text-red-400")} />
        case 'credential_added':
            return <CheckCircle2 className={cn(iconClass, "text-violet-400")} />
    }
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

function formatRelativeTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Agora'
    if (diffHours < 24) return `${diffHours}h`
    return `${diffDays}d`
}

function formatDueDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
    }).format(date)
}

// KPI Card Component
function KPICard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    iconBg,
    delay = 0
}: {
    title: string
    value: string | number
    icon: typeof Users
    trend?: 'up' | 'down'
    trendValue?: string
    iconBg: string
    delay?: number
}) {
    return (
        <div
            className={cn(
                "glass-card kpi-card rounded-2xl p-5 animate-slide-up",
                delay > 0 && `stagger-${delay}`
            )}
            style={{ animationFillMode: 'backwards' }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={cn("kpi-icon", iconBg)}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {trend && trendValue && (
                    <div className={cn("kpi-trend", trend)}>
                        {trend === 'up' ? (
                            <ArrowUpRight className="w-3 h-3" />
                        ) : (
                            <ArrowDownRight className="w-3 h-3" />
                        )}
                        {trendValue}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="kpi-value text-[hsl(var(--text-primary))]">{value}</p>
                <p className="text-sm text-[hsl(var(--text-secondary))]">{title}</p>
            </div>
        </div>
    )
}

export function Dashboard() {
    const activePercentage = Math.round((metrics.activeClients / metrics.totalClients) * 100)

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <header className="sticky top-0 z-10 glass px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                            Dashboard
                        </h1>
                        <p className="text-sm text-[hsl(var(--text-secondary))] hidden md:block">
                            Bem-vindo de volta! Aqui está o resumo do seu negócio.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--bg-tertiary))] text-sm text-[hsl(var(--text-secondary))]">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 p-4 md:p-6 space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <KPICard
                        title="Total de Clientes"
                        value={metrics.totalClients}
                        icon={Users}
                        trend="up"
                        trendValue="+2"
                        iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
                        delay={1}
                    />
                    <KPICard
                        title="Clientes Ativos"
                        value={`${metrics.activeClients}`}
                        icon={TrendingUp}
                        trend="up"
                        trendValue={`${activePercentage}%`}
                        iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600"
                        delay={2}
                    />
                    <KPICard
                        title="MRR"
                        value={formatCurrency(metrics.mrr)}
                        icon={DollarSign}
                        trend="up"
                        trendValue="+8.2%"
                        iconBg="bg-gradient-to-br from-violet-500 to-violet-600"
                        delay={3}
                    />
                    <KPICard
                        title="Pagamentos Pendentes"
                        value={metrics.pendingPayments}
                        icon={AlertCircle}
                        iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
                        delay={4}
                    />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Recent Activity */}
                    <div className="glass-card rounded-2xl overflow-hidden animate-slide-up stagger-3" style={{ animationFillMode: 'backwards' }}>
                        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-subtle))]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-violet-400" />
                                </div>
                                <h2 className="font-semibold text-[hsl(var(--text-primary))]">
                                    Atividade Recente
                                </h2>
                            </div>
                            <button className="text-sm text-[hsl(var(--accent-primary))] hover:underline flex items-center gap-1">
                                Ver tudo
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="divide-y divide-[hsl(var(--border-subtle)/0.5)]">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-3 p-4 hover:bg-[hsl(var(--bg-tertiary)/0.5)] transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--bg-tertiary))] flex items-center justify-center shrink-0 mt-0.5">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-[hsl(var(--text-primary))] leading-snug">
                                            {activity.description}
                                        </p>
                                        <p className="text-xs text-[hsl(var(--text-muted))] mt-1">
                                            {formatRelativeTime(activity.timestamp)} atrás
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Due Dates */}
                    <div className="glass-card rounded-2xl overflow-hidden animate-slide-up stagger-4" style={{ animationFillMode: 'backwards' }}>
                        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-subtle))]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                                    <DollarSign className="w-4 h-4 text-emerald-400" />
                                </div>
                                <h2 className="font-semibold text-[hsl(var(--text-primary))]">
                                    Próximos Vencimentos
                                </h2>
                            </div>
                            <button className="text-sm text-[hsl(var(--accent-primary))] hover:underline flex items-center gap-1">
                                Ver tudo
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="divide-y divide-[hsl(var(--border-subtle)/0.5)]">
                            {upcomingDueDates.map((client) => (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-between p-4 hover:bg-[hsl(var(--bg-tertiary)/0.5)] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--bg-elevated))] to-[hsl(var(--bg-tertiary))] flex items-center justify-center border border-[hsl(var(--border-subtle))]">
                                            <span className="text-sm font-semibold text-[hsl(var(--text-secondary))]">
                                                {client.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[hsl(var(--text-primary))]">
                                                {client.name}
                                            </p>
                                            <p className="text-xs text-[hsl(var(--text-muted))]">
                                                Vence {formatDueDate(client.dueDate)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-emerald-400">
                                            {formatCurrency(client.monthlyValue)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Summary */}
                        <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-transparent border-t border-[hsl(var(--border-subtle))]">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[hsl(var(--text-secondary))]">Total a receber</span>
                                <span className="text-lg font-bold text-emerald-400">
                                    {formatCurrency(upcomingDueDates.reduce((sum, c) => sum + c.monthlyValue, 0))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="glass-card rounded-2xl p-4 md:p-5 animate-slide-up">
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold gradient-text">
                                {formatCurrency(metrics.mrr * 12)}
                            </p>
                            <p className="text-xs md:text-sm text-[hsl(var(--text-muted))] mt-1">ARR Projetado</p>
                        </div>
                        <div className="text-center border-x border-[hsl(var(--border-subtle))]">
                            <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
                                {formatCurrency(metrics.mrr / metrics.activeClients)}
                            </p>
                            <p className="text-xs md:text-sm text-[hsl(var(--text-muted))] mt-1">Ticket Médio</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
                                {activePercentage}%
                            </p>
                            <p className="text-xs md:text-sm text-[hsl(var(--text-muted))] mt-1">Taxa de Retenção</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
