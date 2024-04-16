import NoticeWrite from '@/components/Board/NoticeWrite'
import React from 'react'

export const metadata = {
  title: 'FCON.KR 공지사항 - FC 온라인 검색 FCON.KR',
}

export default function page() {
  return (
    <main id='main' role='main'>
      <div className='container'>
        <NoticeWrite />
      </div>
    </main>
  )
}
