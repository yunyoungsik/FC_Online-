import React from 'react';
import Players from '@/components/Rank/Players';

export const metadata = {
  title: 'FC 온라인 선수 정보 검색 - FC 온라인 검색 FCON.KR',
  description: 'FC 온라인 TOP 10,000 랭커 유저가 사용한 선수의 최근 20경기 평균 스탯을 확인하세요.',
}

export default function page({ params }) {
  const { matchtype, players, position } = params;
  // console.log(matchtype, players, position)

  return (
    <main id="main" role="main">
      <div className="result__desc">
        <div className="container">
          <h2>랭커 평균 스탯</h2>
          <ul>
            <li>데이터는 매시 정각, 두 시간 전의 게임 데이터가 업데이트됩니다.</li>
            <li>TOP 10,000 랭커 유저가 사용한 선수의 20경기 평균 스탯을 조회합니다.</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="rank__result">
          <table>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2}>기본정보</th>
                <th>포지션</th>
                <th>사용횟수</th>
                <th>득점 / 어시스트</th>
                <th title="유효 슛 / 슛팅 수">슛</th>
                <th title="패스 성공 / 패스 시도">패스</th>
                <th title="드리블 성공 / 드리블 시도">드리블</th>
                <th>블락</th>
                <th>태클</th>
              </tr>
            </thead>
            <tbody>
                <Players matchtype={matchtype} players={players} position={position} />
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
