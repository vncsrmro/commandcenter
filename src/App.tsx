import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Clients } from '@/pages/Clients'
import { Vault } from '@/pages/Vault'
import { Financial } from '@/pages/Financial'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="vault" element={<Vault />} />
          <Route path="financial" element={<Financial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
