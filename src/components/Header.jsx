import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded flex items-center justify-center text-white font-bold">TL</div>
          <div>
            <h1 className="text-lg font-semibold">TinyLink</h1>
            <p className="text-xs text-gray-500">Shorten links — simple & fast</p>
          </div>
        </Link>
        <div>
          <a className="inline-block px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow" href="#create">+ Create Link</a>
        </div>
      </div>
    </header>
  );
}
