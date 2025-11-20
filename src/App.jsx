import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Stats from './pages/Stats'
import RedirectHandler from './RedirectHandler'
import Dashboard from './Pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-5xl mx-auto p-6">
        <Routes>

          {/* Homepage → Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Stats Page */}
          <Route path="/code/:code" element={<Stats />} />

          {/* Public redirect short URL */}
          <Route path="/:code" element={<RedirectHandler />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}
