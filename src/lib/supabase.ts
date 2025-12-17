import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Utility Types matching Database Schema
export type DatabaseClient = {
    id: string
    name: string
    slug: string
    status: 'active' | 'blocked' | 'cancelled'
    plan: 'essential' | 'professional' | 'enterprise'
    due_date: string
    monthly_value: number
    notes?: string
    created_at: string
}

export type DatabaseTransaction = {
    id: string
    client_id?: string
    type: 'income' | 'expense'
    status: 'pending' | 'paid' | 'cancelled'
    amount: number
    description: string
    due_date: string
    paid_at?: string
    created_at: string
}

export type DatabaseCredential = {
    id: string
    client_id: string
    title: string
    username: string
    password_encrypted: string // Notionally encrypted, handled by app logic or RLS
    url?: string
    notes?: string
    created_at: string
}
