'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import timeAgo from '@/utils/timeAgo';
import Match from './Match';
import Winrate from './Winrate';
import useCache from '@/utils/useCach';
import CoupangAd from '../AD/CoupangAd';
import { useScrollHandler } from '@/utils/useScrollAd';
import CoupangAd2 from '../AD/CoupangAd2';

const User = ({ name }) => {
  const { divisionData, matchData } = useData();
  const { getFromCache, setToCache } = useCache();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const divisionImg = (divisionPoint) => {
    const divisionMapping = {
      800: 'rank0',
      900: 'rank1',
      1000: 'rank2',
      1100: 'rank3',
      1200: 'rank4',
      1300: 'rank5',
      2000: 'rank6',
      2100: 'rank7',
      2200: 'rank8',
      2300: 'rank9',
      2400: 'rank10',
      2500: 'rank11',
      2600: 'rank12',
      2700: 'rank13',
      2800: 'rank14',
      2900: 'rank15',
      3000: 'rank16',
      3100: 'rank17',
    };
    return divisionMapping[divisionPoint] || '';
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  const fetchData = async () => {
    try {
      const cachedData = getFromCache(decodeURIComponent(name));

      if (cachedData) {
        setData(cachedData.value);
        setLastUpdate(cachedData.timestamp);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/user/${decodeURIComponent(name)}`);
      const data = await res.json();
      setToCache(decodeURIComponent(name), data);
      setData(data);
      setLastUpdate(Date.now());
      setLoading(false);
    } catch (error) {
      console.error('User API Error', error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const nowTime = Date.now();

    try {
      if (!lastUpdate || nowTime - lastUpdate >= 120000) {
        fetchData();
        setBtnDisabled(true);
        setTimeout(() => {
          setBtnDisabled(false);
        }, 120000);
      } else {
        setBtnDisabled(true);
        setTimeout(() => {
          setBtnDisabled(false);
        }, 120000 - (nowTime - lastUpdate));
      }
    } catch (error) {
      console.log('User Update API Error', error);
    }
  };

  // 랭킹 이미지용 함수
  const isAchievementDateThisYear = (dateString) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return new Date(dateString).getFullYear() === year;
  };

   // 광고
   useScrollHandler('.ad__banner2', 100);

  if (loading) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="user">
        <div className="user__left">
          <div className="user__basic">
            <div className="user__maxdivision">
              <ul className="desk hideScroll">
                {data.maxdivision?.map((el, key) => (
                  <li key={key}>
                    <p>{matchData.find((item) => item.matchtype === el.matchType)?.desc} 최고 등급</p>
                    <div className="maxdivision__point ballon">
                      <p>{el.achievementDate.slice(0, 7)}</p>
                      <span>{divisionData.find((item) => item.divisionId === el.division)?.divisionName}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <ul className="mobile hideScroll">
                {data.maxdivision?.map((el, key) => (
                  <li key={key}>
                    <p>
                      {el.achievementDate.slice(0, 7)} - {divisionData.find((item) => item.divisionId === el.division)?.divisionName}({matchData.find((item) => item.matchtype === el.matchType)?.desc})
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="user__info">
              <div className="left">
                <div className="rank">{!data.maxdivision || data.maxdivision.length === 0 || !data.maxdivision.find((item) => item.matchType === 50 && isAchievementDateThisYear(item.achievementDate)) ? <span>Unranked</span> : <Image src={`/images/rank/ico_${divisionImg(data.maxdivision.find((item) => item.matchType === 50 && isAchievementDateThisYear(item.achievementDate)).division)}.webp`} width={72} height={72} alt="디비전 랭크" />}</div>
                <div className="info">
                  <h2 className="ellipsis-test">{data.basic?.nickname}</h2>
                  <span>Lv.{data.basic?.level}</span>
                </div>
              </div>
              <div className="rate">
                <Winrate name={name} ouid={data.basic?.ouid} searchName={data.basic?.nickname} refresh={btnDisabled} />
              </div>
            </div>

            <div className="user__update">
              <div className="update__btn">
                <button type="button" onClick={handleUpdate} disabled={btnDisabled}>
                  {btnDisabled ? `최근 갱신됨` : '전적 갱신'}
                </button>
              </div>
              <div className="update__last">
                <span>최종 업데이트</span>
                <span>{timeAgo(lastUpdate)}</span>
              </div>
            </div>
          </div>

          <aside className="ad__banner">
            <CoupangAd />
          </aside>
        </div>
        <div className="user__right">
          <Match name={name} ouid={data.basic?.ouid} searchName={data.basic?.nickname} matchList={matchData} refresh={btnDisabled} />
        </div>
      </div>
      
      <CoupangAd2 position={'left'} />
      <CoupangAd2 position={'right'} />
    </>
  );
};

export default User;
