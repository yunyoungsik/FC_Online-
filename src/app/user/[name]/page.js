import React from 'react'
import User from '@/components/User/User'

export const metadata = () => ({
  title: `FC 온라인 구단주 전적 검색 - FC 온라인 검색 FCON.KR`,
  description: `FC 온라인 구단주 검색으로 등급 정보와 경기 전적, 경기 정보, 라인업 등 다양한 정보를 확인하세요.`,
})

export default function page({params}) {
  const name = params.name;

  return (
    <main id='main' role="main">
      <div className='container'>
        <User name={name} />
      </div>
    </main>
  )
}
