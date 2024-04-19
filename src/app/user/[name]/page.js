import React from 'react'
import User from '@/components/User/User'

export const metadata = () => ({
  title: `FC 온라인 전적 검색 - FC 온라인 전적 검색 FCON.KR`,
  description: `FC 온라인 구단주를 검색해서 등급 정보와 경기 전적, 경기 정보, 라인업 등 다양한 정보를 확인하세요.`,
})

export default function page({params}) {
  const name = params.name;

  return (
    <main id='main' role="main">
      <div className="result__desc">
        <div className="container">
          <h2>매치 정보 조회</h2>
          <ul>
            <li>데이터는 매시 정각, 두 시간 전의 게임 데이터가 업데이트됩니다.</li>
            <li>e.g. 오후 3시 5분에 구단주를 검색하면 오늘 오후 1시까지의 정보를 조회할 수 있습니다.</li>
          </ul>
        </div>
      </div>
      <div className='container'>
        <User name={name} />
      </div>
    </main>
  )
}
