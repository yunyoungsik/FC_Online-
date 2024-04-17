import Notice from '@/components/Board/Notice';
import React from 'react';

export const metadata = {
  title: 'FCON.KR 공지사항 - FC 온라인 전적 검색 FCON.KR',
};

export default function page({ searchParams }) {
  const page = parseInt(searchParams.page || 1);

  return (
    <main id="main" role="main">
      <div className="container">
        <Notice page={page} />
      </div>
    </main>
  );
}
