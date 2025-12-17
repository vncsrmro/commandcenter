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

    useEffect(() => {
        fetchClients()
    }, [])

    return { clients, loading, error, refetch: fetchClients }
}
