import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function MainLayout() {
    return (
        <div className="flex min-h-screen min-h-[100dvh]">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col w-full overflow-hidden">
                <div className="flex-1 overflow-y-auto pb-24 md:pb-6">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav />

            {/* Mobile Menu Trigger (from Sidebar) */}
            <div className="md:hidden">
                <Sidebar />
            </div>
        </div>
    )
}
