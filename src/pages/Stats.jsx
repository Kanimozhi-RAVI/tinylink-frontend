import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE || '';

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await fetch(`${API}/api/links/${code}`, {
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (!res.ok) throw new Error('Failed to fetch link');
        const data = await res.json();
        setLink(data);
      } catch (err) {
        console.error(err);
        setLink(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [code]);

  if (loading) return <div>Loading…</div>;
  if (!link) return <div className="text-red-500">Link not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Stats for {link.code}</h1>
      <table className="min-w-full bg-white shadow rounded">
        <tbody>
      <tr>
  <td className="p-2 font-semibold">Original URL</td>
  <td className="p-2 max-w-2xl overflow-hidden text-ellipsis whitespace-nowrap">
    {link.url}
  </td>
</tr>

          <tr>
            <td className="p-2 font-semibold">Short URL</td>
            <td className="p-2">{link.short_url}</td>
          </tr>
          <tr>
            <td className="p-2 font-semibold">Total Clicks</td>
            <td className="p-2">{link.clicks}</td>
          </tr>
          <tr>
            <td className="p-2 font-semibold">Last Clicked</td>
            <td className="p-2">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
