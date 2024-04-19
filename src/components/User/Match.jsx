'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import timeAgo from '@/utils/timeAgo';

import { useData } from '@/context/DataContext';
import DetailInfo from './DetailInfo';
import DetailTeam from './DetailTeam';
import useCache from '@/utils/useCach';
import MatchStats from './MatchStats';
import BasicImage from '../Img/BasicImage';

const Match = ({ name, ouid, searchName, refresh }) => {
  const { getFromCache, setToCache } = useCache();
  const { spidData, matchData, seasonData, positionData } = useData();
  const [data, setData] = useState(null);
  // console.log(data);
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

  // 중복 코드 함수화
  const findMatchDetail = (match, searchName) => match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail;

  // 조건문 간소화
  const getMatchResult = (matchDetail) => {
    switch (matchDetail?.matchEndType) {
      case 0:
        return matchDetail.matchResult;
      case 1:
        return '몰수승';
      default:
        return '몰수패';
    }
  };

  const renderPlayerList = (players, teamIndex, spidData, seasonData, matchType) => {
    const positionPriority = [25, 21, 20, 22, 24, 26, 23, 27, 14, 15, 13, 16, 12, 10, 11, 9, 18, 19, 17, 5, 6, 4, 7, 3, 8, 2, 1, 0, 28];
    players.sort((a, b) => {
      return positionPriority.indexOf(parseInt(a.spPosition)) - positionPriority.indexOf(parseInt(b.spPosition));
    });

    return players.map((player, key) => {
      const playerName = spidData.find((spid) => spid.id === player.spId)?.name; // 선수 이름 가져오기

      return (
        <li key={key}>
          <BasicImage src={seasonData.find((season) => season.seasonId === Math.floor(player.spId / 1000000))?.seasonImg} width={16} height={13} quality={70} alt={`${playerName} ${player.name}`} />
          <span className="ellipsis">
            <Link href={`/stats/${matchType}/${player.spId}/${player.spPosition}`}>{playerName}</Link>
          </span>
          <div className="name ballon">
            <p>{playerName}</p>
          </div>
        </li>
      );
    });
  };

  const convertTime = (utcString) => {
    const dateParts = utcString.split('T');
    const dateString = dateParts[0];
    const timeParts = dateParts[1].split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    const timeDifference = 9 * 60 * 60 * 1000;

    const utcDate = new Date(Date.UTC(parseInt(dateString.split('-')[0]), parseInt(dateString.split('-')[1]) - 1, parseInt(dateString.split('-')[2]), hours, minutes, seconds));

    const koreaDate = new Date(utcDate.getTime() + timeDifference);
    const koreaDateString = koreaDate.toISOString().replace('Z', '');

    const formattedKoreaDateString = koreaDateString.slice(0, -4);
    return formattedKoreaDateString;
  };

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

      <MatchStats data={data} searchName={searchName} spidData={spidData} seasonData={seasonData} />

      <div className="user__match">
        <ul>
          {!data || (data.matches && data.matches?.length) === 0 ? (
            <li className="notData">
              <p>기록된 정보가 없습니다.</p>
            </li>
          ) : (
            data.matches?.slice(0, limit).map((match, index) => (
              <li key={index} className={`match ${findMatchDetail(match, searchName)?.matchResult === '승' ? 'win' : findMatchDetail(match, searchName)?.matchResult === '패' ? 'lose' : 'draw'}`}>
                <div className="match">
                  <div className="match__left">
                    <div className="matchLeft__top">
                      <p className="matchType">{matchData.find((item) => item.matchtype === match.matchType)?.desc}</p>
                      <div className="matchDate">
                        <div className='matchDate-wrap'>
                          <span>
                            {timeAgo(convertTime(match.matchDate))}
                          </span>
                          <div className="ballon">
                            <p>{convertTime(match.matchDate)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="line50" />
                    <div className="matchLeft__bottom">
                      <p className="matchResult">{getMatchResult(findMatchDetail(match, searchName))}</p>
                    </div>
                  </div>

                  <div className="match__center">
                    <div className="matchCenter__left">
                      <ul>
                        <li className="rating">
                          <span>경기평점</span>
                          {findMatchDetail(match, searchName)?.averageRating?.toFixed(2)}
                        </li>
                        <li>
                          <span>컨트롤러</span>
                          {findMatchDetail(match, searchName)?.controller === 'keyboard' ? '키보드' : findMatchDetail(match, searchName)?.controller === 'pad' ? '패드' : '기타'}
                        </li>
                        <li>
                          <span>점유율</span>
                          {findMatchDetail(match, searchName)?.possession}
                          <span>%</span>
                        </li>
                      </ul>
                    </div>

                    <div className="matchCenter__center">
                      <ul>
                        <li>
                          <div>
                            <div className="name ellipsis-test">
                              <Link className="ellipsis-test" href={`/user/${match.matchInfo[0]?.nickname}`}>
                                <span className="ellipsis-test">{match.matchInfo[0]?.nickname}</span>
                              </Link>
                            </div>
                            <div className="ballon">
                              <p>{match.matchInfo[0]?.nickname}</p>
                            </div>
                          </div>
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
                        <li>
                          <div>
                            <div className="name ellipsis-test">
                              <Link className="ellipsis-test" href={`/user/${match.matchInfo[1]?.nickname}`}>
                                <span className="ellipsis-test">{match.matchInfo[1]?.nickname}</span>
                              </Link>
                            </div>
                            <div className="ballon">
                              <p>{match.matchInfo[1]?.nickname}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="matchCenter__right">
                      <ul className="player">{renderPlayerList(match.matchInfo.find((item) => item.nickname === searchName)?.player || [], 0, spidData, seasonData, match.matchType)}</ul>
                    </div>
                  </div>

                  <div className={`match__right ${showDetailIndex === index ? 'active' : ''}`} onClick={() => handleDetail(index)}>
                    <BasicImage src="/images/svg/arrow.svg" width={12} height={12} quality={70} alt="화살표" />
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
