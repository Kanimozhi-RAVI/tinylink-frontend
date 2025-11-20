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
      if (res.ok && onDeleted) onDeleted(link.code);
      else {
        const j = await res.json().catch(() => null);
        alert(j?.error || "Delete failed");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally { setDeleting(false); }
  }

  return (
    <tr className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
   <td className="px-5 py-4 align-top">
  <div className="flex flex-col">
    <span className="font-mono text-sky-700 text-lg">{link.code}</span>

    <Link
      to={`/code/${link.code}`}
      className="mt-2 inline-block  py-1 rounded-lg bg-sky-50 text-sky-700
                 hover:bg-sky-100 shadow-sm transition text-sm text-center"
    >
      View Stats
    </Link>
  </div>
</td>

      <td className="px-6 py-4 text-gray-700" title={link.url}>{short(link.url)}</td>
      <td className="px-6 py-4 text-gray-700">{link.clicks ?? 0}</td>
      <td className="px-3 py-4 text-gray-500">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</td>
      <td className="px-4 py-4">
  <div className="flex flex-wrap gap-2">

    <button
      onClick={() =>
        navigator.clipboard.writeText(
          `${(import.meta.env.VITE_BASE_URL || window.location.origin).replace(/\/$/, '')}/${link.code}`
        )
      }
      className="px-3 py-1.5 text-sm rounded-md bg-sky-100 text-sky-700 
                 hover:bg-sky-200 shadow-sm transition"
    >
      Copy
    </button>

    <a
      href={`${(import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')}/${link.code}`}
      className="px-3 py-1.5 text-sm rounded-md bg-green-100 text-green-700 
                 hover:bg-green-200 shadow-sm transition"
    >
      Open
    </a>

    <button
      onClick={handleDelete}
      disabled={deleting}
      className="px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-700 
                 hover:bg-red-200 shadow-sm transition"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>

  </div>
</td>

    </tr>
  );
}

