import { useEffect, useState } from 'react'
import { supabase, type DatabaseTransaction } from '@/lib/supabase'

export function useFinancial() {
    const [transactions, setTransactions] = useState<DatabaseTransaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0, balanceGrowth: 12 })

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50)

            if (error) throw error

            const txs = data || []
            setTransactions(txs)

            // Calculate simple stats on the fly
            const income = txs.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
            const expense = txs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
            setStats({
                income,
                expense,
                balance: income - expense,
                balanceGrowth: 12 // Mocked for now, needs historical data
            })

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return { transactions, stats, loading, error, refetch: fetchTransactions }
}
