import React, { useState } from 'react';
const API = import.meta.env.VITE_API_BASE || '';

export default function AddLinkForm({ onAdded }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  function validate() {
    if (!url) return "URL is required";
    try { new URL(url); } catch { return "Invalid URL"; }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, code: code || undefined })
      });
      const j = await res.json().catch(() => null);
      if (!res.ok) {
        setError(j?.error || 'Failed to create');
        return;
      }
      // backend returns { code, shortUrl, url }
      setSuccess('Created!');
      setUrl(''); setCode('');
      if (onAdded) onAdded(j);
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError("Network error");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h3 className="font-semibold text-lg mb-3">Create Short Link</h3>

      <label className="block text-sm">URL</label>
      <input className="border rounded w-full px-3 py-2 mb-3" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} />

      <label className="block text-sm">Custom code (optional)</label>
      <input className="border rounded w-full px-3 py-2 mb-3" placeholder="6–8 chars" value={code} onChange={e => setCode(e.target.value)} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Creating..." : "Create"}</button>

      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
      {success && <div className="text-green-600 mt-2 text-sm">{success}</div>}
    </form>
  );
}
