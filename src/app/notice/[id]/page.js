import NoticeView from '@/components/Board/NoticeView';
import React from 'react'

export const metadata = {
  title: 'FCON.KR 공지사항 - FC 온라인 검색 FCON.KR',
}

const page = ({params}) => {
  const postId = params.id;
  // console.log(id)

  return (
    <main id='main' role='main'>
      <div className='container'>
        <NoticeView postId={postId} />
      </div>
    </main>
  )
}

export default page