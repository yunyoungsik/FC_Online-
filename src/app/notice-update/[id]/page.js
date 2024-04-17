import NoticeUpdate from '@/components/Board/NoticeUpdate'
import { useSearchParams } from 'next/navigation';
import React from 'react'

export const metadata = {
  title: 'FCON.KR 공지사항 - FC 온라인 전적 검색 FCON.KR',
}

export default function page({params}) {
  const postId = params.id;
  // console.log(postId)

  return (
    <main id='main' role='main'>
      <div className='container'>
        <NoticeUpdate postId={postId} />
      </div>
    </main>
  )
}
