import { useEffect, useState } from 'react'
import { supabase, type DatabaseCredential } from '@/lib/supabase'

export function useVault() {
    const [credentials, setCredentials] = useState<DatabaseCredential[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCredentials = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('credentials')
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

    useEffect(() => {
        fetchCredentials()
    }, [])

    return { credentials, loading, error, refetch: fetchCredentials }
}
