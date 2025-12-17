import { useEffect, useState } from 'react'
import { supabase, type DatabaseClient } from '@/lib/supabase'

export function useClients() {
    const [clients, setClients] = useState<DatabaseClient[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchClients = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('name')

            if (error) throw error
            setClients(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const createClient = async (client: Omit<DatabaseClient, 'id' | 'created_at'>) => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .insert(client)
                .select()
                .single()

            if (error) throw error
            setClients(prev => [...prev, data])
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    const deleteClient = async (id: string) => {
        try {
            const { error } = await supabase
                .from('clients')
                .delete()
                .eq('id', id)

            if (error) throw error
            setClients(prev => prev.filter(c => c.id !== id))
        } catch (err: any) {
            setError(err.message)
            alert('Erro ao deletar cliente: ' + err.message)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return { clients, loading, error, refetch: fetchClients, createClient, deleteClient }
}
