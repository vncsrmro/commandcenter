import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface VaultCredential {
    id: string
    title: string
    username: string
    password_encrypted: string
    url?: string
    notes?: string
    client_id?: string
    created_at: string
}

export function useVault() {
    const [credentials, setCredentials] = useState<VaultCredential[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCredentials = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('vault_credentials')
                .select('*')
                .order('title')

            if (error) throw error
            setCredentials(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const createCredential = async (cred: Omit<VaultCredential, 'id' | 'created_at'>) => {
        try {
            const { data, error } = await supabase
                .from('vault_credentials')
                .insert(cred)
                .select()
                .single()

            if (error) throw error
            setCredentials(prev => [...prev, data])
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    const deleteCredential = async (id: string) => {
        try {
            const { error } = await supabase
                .from('vault_credentials')
                .delete()
                .eq('id', id)

            if (error) throw error
            setCredentials(prev => prev.filter(c => c.id !== id))
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    useEffect(() => {
        fetchCredentials()
    }, [])

    return { credentials, loading, error, refetch: fetchCredentials, createCredential, deleteCredential }
}
