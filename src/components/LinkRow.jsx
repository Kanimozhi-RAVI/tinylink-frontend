import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const API = import.meta.env.VITE_API_BASE || '';

function short(url) {
  return url.length > 50 ? url.slice(0, 47) + "..." : url;
}

export default function LinkRow({ link, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this link?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/links/${link.code}`, { method: "DELETE" });
      if (res.ok) {
        if (onDeleted) onDeleted(link.code);
      } else {
        const j = await res.json().catch(() => null);
        alert(j?.error || "Delete failed");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally { setDeleting(false); }
  }

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 align-top">
        <div className="font-mono text-sky-600">{link.code}</div>
        <div className="text-xs text-gray-400 mt-1"><Link to={`/code/${link.code}`} className="underline">View stats</Link></div>
      </td>
      <td className="px-4 py-3 align-top" title={link.url}>{short(link.url)}</td>
      <td className="px-4 py-3 align-top">{link.clicks ?? 0}</td>
      <td className="px-4 py-3 align-top">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</td>
      <td className="px-4 py-3 align-top">
        <div className="flex items-center gap-2">
          <button onClick={() => navigator.clipboard.writeText(`${(import.meta.env.VITE_BASE_URL||window.location.origin).replace(/\/$/,'')}/${link.code}`)} className="px-2 py-1 border rounded text-sm">Copy</button>
          <a className="px-2 py-1 border rounded text-sm" href={`${(import.meta.env.VITE_API_BASE||'').replace(/\/$/,'')}/${link.code}`}>Open</a>
          <button onClick={handleDelete} className="px-2 py-1 border rounded text-sm text-red-600" disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</button>
        </div>
      </td>
    </tr>
  );
}
