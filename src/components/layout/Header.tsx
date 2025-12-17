import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface HeaderProps {
    title: string
    description?: string
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header className="h-16 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6 flex items-center justify-between">
            <div>
                <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    <Input
                        placeholder="Buscar..."
                        className="pl-9 w-64 bg-[hsl(var(--card))]"
                    />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                        3
                    </span>
                </Button>

                {/* User Avatar */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">VR</span>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                            Admin
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                            admin@paperx.io
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
