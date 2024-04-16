'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import Players from './Players';
import CoupangAd from '../AD/CoupangAd';
import { useScrollHandler } from '@/utils/useScrollAd';
import CoupangAd2 from '../AD/CoupangAd2';

const Stats = () => {
  const { matchData, positionData, spidData, seasonData } = useData();
  const [matchType, setMatchType] = useState(50);
  const [category, setCategory] = useState('공격수');
  const [keyword, setKeyword] = useState('');
  const [selectPosition, setSelectPosition] = useState(20);
  const [filterPlayer, setFilterPlayer] = useState();

  const positionCategories = {
    공격수: ['ST', 'CF', 'RF', 'LF', 'RS', 'LS', 'RW', 'LW'],
    수비수: ['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'],
    미드필더: ['CM', 'LCM', 'RCM', 'LM', 'RM', 'CDM', 'LDM', 'RDM', 'CAM', 'LAM', 'RAM'],
    골키퍼: ['GK'],
  };

  // 포지션1에서 카테고리 선택 시 처리
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // 선택된 카테고리에 따라 포지션 필터링
  const filteredPositions = positionData.filter((pos) => positionCategories[category]?.includes(pos.desc));

  // Enter 검색
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const filteredPlayers = spidData.filter((item) => item.name.includes(keyword));
      if (filteredPlayers) {
        setFilterPlayer(filteredPlayers);
      } else {
        console.log('Stat Enter Error');
      }
    }
  };

  // 광고
  useScrollHandler('.ad__banner2', 100);

  return (
    <>
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
        <aside className="ad__banner">
          <CoupangAd />
        </aside>
      </div>

      <div className="container">
        <div className="rank__matchType hideScroll">
          <ul>
            {matchData.map((el, key) => (
              <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
                {el.desc}
              </li>
            ))}
          </ul>
        </div>

        <div className="rank__nav">
          <div className="rank__position">
            <div className="position__select">
              <label htmlFor="pos1">포지션1</label>
              <select name="pos1" id="pos1" onChange={handleCategoryChange}>
                <option value="공격수">공격수</option>
                <option value="수비수">수비수</option>
                <option value="미드필더">미드필더</option>
                <option value="골키퍼">골키퍼</option>
              </select>
            </div>

            <div className="position__select">
              <label htmlFor="pos2">포지션2</label>
              <select name="pos2" id="pos2" onChange={(e) => setSelectPosition(e.target.value)}>
                {filteredPositions.map((pos) => (
                  <option value={pos.spposition} key={pos.spposition}>
                    {pos.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rank__search">
            <label htmlFor="rank__search">검색</label>
            <input id="rank__search" name="rank__search" type="text" value={keyword} placeholder="선수 이름" onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleSearch} />
          </div>
        </div>

        <div className="rank__result">
          <div className="result__wrap hideScroll">
            <table>
              <colgroup>
                <col />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>기본정보</th>
                  <th>포지션</th>
                  <th>사용횟수</th>
                  <th>득점/도움</th>
                  <th>유효슛/슈팅</th>
                  <th>패스성공/시도</th>
                  <th>드리블성공/시도</th>
                  <th>블락</th>
                  <th>태클</th>
                </tr>
              </thead>
              <tbody>
                {filterPlayer?.map((item, index) => (
                  <Players key={index} item={item} index={index} matchtype={matchType} players={item.id} position={selectPosition} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CoupangAd2 position={'left'} />
      <CoupangAd2 position={'right'} />
    </>
  );
};

export default Stats;
