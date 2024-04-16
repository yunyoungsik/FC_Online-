'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCache from '@/utils/useCach';

const Winrate = ({ name, ouid, searchName, refresh }) => {
  const { getFromCache, setToCache } = useCache();
  const [data, setData] = useState(null);
  const [matchType, setMatchType] = useState(50);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [wins, setWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [losses, setLosses] = useState(0);
  const [winRate, setWinRate] = useState(0);

  useEffect(() => {
    fetchData();
  },[refresh, name])

  // 경기 정보
  const fetchData = async () => {
    try {
      const cachedData = getFromCache(`${decodeURIComponent(name)}_${matchType}`);

      if (cachedData) {
        setData(cachedData.value);
        setLoading(false);
        return;
      }

      const res = await axios.post(`/api/user/${decodeURIComponent(name)}`, {
        ouid: ouid,
        matchType: matchType,
        offset: offset,
        limit: limit,
      });
      const data = await res.data;
      setToCache(`${decodeURIComponent(name)}_${matchType}`, data)
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Winrate API Error', error);
      setLoading(false);
    }
  };

  // 승률 계산
  useEffect(() => {
    if (data && data.matches) {
      let winsCount = 0;
      let drawsCount = 0;
      let lossesCount = 0;
      data.matches?.forEach((match) => {
        const matchResult = match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult;
        if (matchResult === '승') {
          winsCount++;
        } else if (matchResult === '무') {
          drawsCount++;
        } else if (matchResult === '패') {
          lossesCount++;
        }
      });
      setWins(winsCount);
      setDraws(drawsCount);
      setLosses(lossesCount);
      const totalMatches = winsCount + drawsCount + lossesCount;
      if (totalMatches > 0) {
        setWinRate((winsCount / totalMatches) * 100);
      } else {
        setWinRate(0);
      }
    }
  }, [data, searchName]);

  if (loading) {
    return (
      <div className="loading rate__info">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="rate__info">
        <div>
          {wins}승 {draws}무 {losses}패
          <div className='ballon'>
            <p>최근 공식경기 전적</p>
          </div>
        </div>
        <p>승률 {winRate}%</p>
      </div>
    </>
  );
};

export default Winrate;
