import React, { useEffect, useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import LinkRow from '../components/LinkRow';

const API = import.meta.env.VITE_API_BASE || '';
const BASE = (import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '');

function truncate(s, n = 80) {
  return s && s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

const fetchLinks = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API}/api/links`, {
      headers: { 'Cache-Control': 'no-cache' } // <- force fresh fetch
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error('Fetch error:', res.status, text);
      setLinks([]);
      return;
    }

    const data = await res.json();
    setLinks(Array.isArray(data) ? data : []);
  } catch (e) {
    console.error('Fetch exception:', e);
    setLinks([]);
  } finally { setLoading(false); }
};


  useEffect(() => { fetchLinks(); }, []);

  const handleAdded = (newLink) => {
    // backend returns object (e.g. { code, shortUrl, url }), prefer refetch to be consistent
    fetchLinks();
  };

  const handleDeleted = (code) => {
    setLinks(prev => prev.filter(l => l.code !== code));
  };

  const filtered = links.filter(l =>
    l.code.toLowerCase().includes(query.toLowerCase()) ||
    (l.url || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div id="create" className="mb-6">
        <AddLinkForm onAdded={handleAdded} />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search by code or URL" className="w-full md:w-1/2 border rounded p-2" />
        <div className="text-sm text-gray-500">Total: {links.length}</div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Target URL</th>
              <th className="px-4 py-3">Clicks</th>
              <th className="px-4 py-3">Last clicked</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-6 text-center">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500">No links yet.</td></tr>
            ) : (
              filtered.map(l => (
                <LinkRow key={l.code} link={l} onDeleted={handleDeleted} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
