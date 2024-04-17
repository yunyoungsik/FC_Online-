'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [name, setName] = useState('');

  const router = useRouter();

  const handleSearch = () => {
    router.push(`/user/${name}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchBar">
      <label htmlFor="search" className="hidden">
        검색
      </label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="구단주명"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSearch}> {/* type을 submit으로 변경 */}
        검색
      </button>
  </div>
  );
}
