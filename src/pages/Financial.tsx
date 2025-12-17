import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Plus
} from 'lucide-react'

const transactions = [
    { id: 1, desc: 'Mensalidade Tech Solutions', value: 599, type: 'income', date: 'Hoje' },
    { id: 2, desc: 'Servidor AWS', value: -150, type: 'expense', date: 'Ontem' },
    { id: 3, desc: 'Mensalidade Digital Agency', value: 899, type: 'income', date: '22 Jan' },
]

export function Financial() {
    return (
        <div className="animate-pop max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="app-icon app-icon-green w-12 h-12 rounded-[14px]">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Financeiro</h1>
                        <p className="text-white/60 text-sm">Carteira e Movimentações</p>
                    </div>
                </div>
                <button className="btn-glass flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nova
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Apple Card Style Widget */}
                <div className="widget p-6 bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] relative overflow-hidden h-[220px] flex flex-col justify-between border-t border-white/10 group hover:scale-[1.02] transition-transform">
                    {/* Abstract Mesh Gradient */}
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-green-500/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="flex justify-between items-start z-10">
                        <div>
                            <p className="text-white/60 text-sm font-medium">Saldo Atual</p>
                            <h2 className="text-4xl font-bold text-white mt-1">R$ 1.245,00</h2>
                        </div>
                        <CreditCard className="w-8 h-8 text-white/20" />
                    </div>

                    <div className="flex gap-4 z-10">
                        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-bold text-sm">+ R$ 5.400</span>
                        </div>
                        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                            <TrendingDown className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-bold text-sm">- R$ 1.250</span>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="widget p-0 overflow-hidden min-h-[400px]">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="font-semibold text-sm">Últimas Transações</h3>
                    </div>
                    <div className="p-2">
                        {transactions.map(t => (
                            <div key={t.id} className="glass-list-item px-4 py-3 hover:bg-white/5 rounded-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-white'}`}>
                                        {t.type === 'income' ? <DollarSign className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white text-sm">{t.desc}</p>
                                        <p className="text-xs text-white/40">{t.date}</p>
                                    </div>
                                </div>
                                <span className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                                    {t.type === 'income' ? '+' : ''} R$ {Math.abs(t.value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
