// ===== Client Types =====
export type ClientStatus = 'active' | 'blocked' | 'cancelled'
export type ClientPlan = 'essential' | 'professional' | 'enterprise'

export interface Client {
    id: string
    name: string
    slug: string
    status: ClientStatus
    plan: ClientPlan
    dueDate: string
    monthlyValue: number
    notes?: string
    createdAt: string
    updatedAt: string
}

// ===== Credential Types =====
export interface Credential {
    id: string
    clientId: string
    clientName?: string
    title: string
    username: string
    password: string
    url?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

// ===== Financial Types =====
export type TransactionType = 'income' | 'expense'
export type TransactionStatus = 'pending' | 'paid' | 'overdue'

export interface Transaction {
    id: string
    clientId?: string
    clientName?: string
    type: TransactionType
    status: TransactionStatus
    amount: number
    description: string
    dueDate: string
    paidAt?: string
    createdAt: string
}

// ===== Dashboard Types =====
export interface DashboardMetrics {
    totalClients: number
    activeClients: number
    mrr: number
    pendingPayments: number
}

export interface ActivityItem {
    id: string
    type: 'client_created' | 'payment_received' | 'client_blocked' | 'credential_added'
    description: string
    timestamp: string
}
