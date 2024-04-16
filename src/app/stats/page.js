import React from 'react'
import Stats from '@/components/Rank/Stats'

export const metadata = {
  title: 'FC 온라인 선수 정보 검색 - FC 온라인 검색 FCON.KR',
  description: 'FC 온라인 TOP 10,000 랭커 유저가 사용한 선수의 최근 20경기 평균 스탯을 확인하세요.',
}

export default function page() {
  return (
    <main id='main' role="main">
        <Stats />
    </main>
  )
}
