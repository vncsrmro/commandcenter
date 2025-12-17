import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle2,
    UserPlus,
    CreditCard
} from 'lucide-react'
import type { DashboardMetrics, ActivityItem, Client } from '@/types'

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
        description: 'Cliente bloqueado: Old Corp (inadimplente)',
        timestamp: '2024-01-14T16:45:00',
    },
    {
        id: '4',
        type: 'credential_added',
        description: 'Nova credencial adicionada para StartupX',
        timestamp: '2024-01-14T14:20:00',
    },
]

const upcomingDueDates: Pick<Client, 'id' | 'name' | 'dueDate' | 'monthlyValue'>[] = [
    { id: '1', name: 'Tech Solutions', dueDate: '2024-01-20', monthlyValue: 599 },
    { id: '2', name: 'Digital Agency', dueDate: '2024-01-22', monthlyValue: 899 },
    { id: '3', name: 'StartupX', dueDate: '2024-01-25', monthlyValue: 349 },
    { id: '4', name: 'Creative Studio', dueDate: '2024-01-28', monthlyValue: 599 },
]

function getActivityIcon(type: ActivityItem['type']) {
    switch (type) {
        case 'payment_received':
            return <CreditCard className="w-4 h-4 text-emerald-400" />
        case 'client_created':
            return <UserPlus className="w-4 h-4 text-blue-400" />
        case 'client_blocked':
            return <AlertCircle className="w-4 h-4 text-red-400" />
        case 'credential_added':
            return <CheckCircle2 className="w-4 h-4 text-violet-400" />
    }
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
    }).format(date)
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

    if (diffHours < 1) return 'Agora mesmo'
    if (diffHours < 24) return `${diffHours}h atrás`
    return `${diffDays}d atrás`
}

export function Dashboard() {
    return (
        <div className="flex flex-col h-full">
            <Header
                title="Dashboard"
                description="Visão geral do seu negócio"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="hover:border-emerald-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Total de Clientes
                            </CardTitle>
                            <Users className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.totalClients}</div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                <span className="text-emerald-400">+2</span> este mês
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-emerald-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Clientes Ativos
                            </CardTitle>
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-400">
                                {metrics.activeClients}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                {Math.round((metrics.activeClients / metrics.totalClients) * 100)}% do total
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-emerald-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                MRR
                            </CardTitle>
                            <DollarSign className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(metrics.mrr)}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                <span className="text-emerald-400">+8.2%</span> vs mês anterior
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-amber-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                Pagamentos Pendentes
                            </CardTitle>
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-400">
                                {metrics.pendingPayments}
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Requer atenção
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-400" />
                                Atividade Recente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--secondary))]/50 hover:bg-[hsl(var(--secondary))] transition-colors"
                                    >
                                        <div className="mt-0.5">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[hsl(var(--foreground))]">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                                {formatRelativeTime(activity.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Due Dates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                Próximos Vencimentos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {upcomingDueDates.map((client) => (
                                    <div
                                        key={client.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--secondary))]/50 hover:bg-[hsl(var(--secondary))] transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                                                {client.name}
                                            </p>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                                Vence em {formatDate(client.dueDate)}
                                            </p>
                                        </div>
                                        <Badge variant="secondary">
                                            {formatCurrency(client.monthlyValue)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
