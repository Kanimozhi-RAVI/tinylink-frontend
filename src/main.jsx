import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stats from './pages/Stats';
import Header from './components/Header';
import './index.css';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
