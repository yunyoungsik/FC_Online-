'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import timeAgo from '@/utils/timeAgo';

import { useData } from '@/context/DataContext';
import DetailInfo from './DetailInfo';
import DetailTeam from './DetailTeam';
import useCache from '@/utils/useCach';

const Match = ({ name, ouid, searchName, refresh }) => {
  const { getFromCache, setToCache } = useCache();
  const { spidData, matchData, seasonData, positionData } = useData();
  const [data, setData] = useState(null);
  // console.log(data)
  const [loading, setLoading] = useState(true);
  const [matchType, setMatchType] = useState(50);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [detailActive, setDetailActive] = useState('info');
  const [showDetailIndex, setShowDetailIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, [refresh, name, matchType, limit]);

  const fetchData = async () => {
    try {
      const cachedData = getFromCache(`${decodeURIComponent(name)}_${matchType}`);

      if (cachedData && cachedData?.value.matches.length > limit) {
        setData(cachedData.value);
        setLoading(false);
        return;
      }

      const res = await axios.post(`/api/user/${decodeURIComponent(name)}`, {
        ouid,
        matchType,
        offset: offset,
        limit: limit,
      });
      const data = await res.data;
      setToCache(`${decodeURIComponent(name)}_${matchType}`, data);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Match API Error', error);
      setLoading(false);
    }
  };

  const handleMore = () => {
    setLimit(limit + 5);
  };

  const handleDetail = (index) => {
    setShowDetailIndex(index === showDetailIndex ? null : index);
  };

  useEffect(() => {
    setShowDetailIndex(null);
  }, [matchType]);

  if (loading) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="user__matchType hideScroll">
        <ul>
          {matchData.map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="user__match">
        <ul>
          {!data || (data.matches && data.matches?.length) === 0 ? (
            <li className="notData">
              <p>기록된 정보가 없습니다.</p>
            </li>
          ) : (
            data.matches?.slice(0, limit).map((match, index) => (
              <li key={index} className={match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult === '승' ? 'win' : match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult === '패' ? 'lose' : 'draw'}>
                <div className="match">
                  <div className="match__left">
                    <div className="matchLeft__top">
                      <p className="matchType">{matchData.find((item) => item.matchtype === match.matchType)?.desc}</p>
                      <p className="matchDate">{timeAgo(match.matchDate)}</p>
                    </div>
                    <div className="line50" />
                    <div className="matchLeft__bottom">
                      <p className="matchResult">{match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult}</p>
                    </div>
                  </div>

                  <div className="match__center">
                    <div className="matchCenter__left">
                      <ul>
                        <li className="rating">
                          <span>경기평점</span>
                          {match.matchInfo?.find((item) => item.nickname === searchName)?.matchDetail.averageRating?.toFixed(2)}
                        </li>
                        <li>
                          <span>컨트롤러</span>
                          {match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.controller === 'keyboard' ? '키보드' : match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.controller === 'pad' ? '패드' : '기타'}
                        </li>
                        <li>
                          <span>점유율</span>
                          {match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.possession}
                          <span>%</span>
                        </li>
                      </ul>
                    </div>

                    <div className="matchCenter__center">
                      <ul>
                        <li>
                          <Link className="ellipsis-test" href={`/user/${match.matchInfo[0]?.nickname}`}>
                            {match.matchInfo[0]?.nickname}
                          </Link>
                        </li>
                        <li className="score">
                          <div className="score__left">
                            <p>{match.matchInfo[0]?.shoot.goalTotal}</p>
                          </div>

                          <span>:</span>

                          <div className="score__right">
                            <p>{match.matchInfo[1]?.shoot.goalTotal}</p>
                          </div>
                        </li>
                        <li className="ellipsis-test">
                          <Link className="ellipsis-test" href={`/user/${match.matchInfo[1]?.nickname}`}>{match.matchInfo[1]?.nickname}</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="matchCenter__right">
                      <ul className="player">
                        {/* 시즌아이콘 */}
                        {match.matchInfo
                          .find((item) => item.nickname === searchName)
                          ?.player.map((el, key) => {
                            const playerName = spidData.find((player) => player.id === el.spId)?.name;
                            return (
                              <li key={key}>
                                <Image src={seasonData.find((season) => season.seasonId === Math.floor(el.spId / 1000000))?.seasonImg} width={16} height={13} alt={`${seasonData.find((season) => season.seasonId === Math.floor(el.spId / 1000000))?.className} ${el.name}`} />
                                <span className="ellipsis">
                                  <Link href={`/stats/${matchType}/${el.spId}/${el.spPosition}`}>{playerName}</Link>
                                </span>
                                <div className="name ballon">
                                  <p>{playerName}</p>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  <div className={`match__right ${showDetailIndex === index ? 'active' : ''}`} onClick={() => handleDetail(index)}>
                    <Image src="/images/svg/arrow.svg" width={12} height={12} alt="화살표" />
                  </div>
                </div>

                {showDetailIndex === index && (
                  <div className="match__detail">
                    <div className="detail__nav hideScroll">
                      <ul>
                        <li className={detailActive === 'info' ? 'active' : ''} data-value={'info'} onClick={(e) => setDetailActive(e.currentTarget.dataset.value)}>
                          경기기록
                        </li>
                        <li className={detailActive === 'player0' ? 'active' : ''} data-value={'player0'} onClick={(e) => setDetailActive(e.currentTarget.dataset.value)}>
                          {match.matchInfo[0]?.nickname} 라인업
                        </li>
                        <li className={detailActive === 'player1' ? 'active' : ''} data-value={'player1'} onClick={(e) => setDetailActive(e.currentTarget.dataset.value)}>
                          {match.matchInfo[1]?.nickname} 라인업
                        </li>
                      </ul>
                    </div>

                    <div className="detail__info hideScroll">
                      <DetailInfo match={match} detailActive={detailActive} />

                      <div className={`player ${detailActive === 'player0' ? 'active' : ''}`}>
                        <DetailTeam match={match} matchType={matchType} infoNum={0} detailActive={detailActive} spidData={spidData} seasonData={seasonData} positionData={positionData} />
                      </div>

                      <div className={`player ${detailActive === 'player1' ? 'active' : ''}`}>
                        <DetailTeam match={match} matchType={matchType} infoNum={1} detailActive={detailActive} spidData={spidData} seasonData={seasonData} positionData={positionData} />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>

        {data.matches?.length === limit && limit < 20 && (
          <button className="more" type="button" onClick={handleMore}>
            더보기
          </button>
        )}
      </div>
    </>
  );
};

export default Match;
