'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import PlayerImage2 from '../Img/PlayerImage2';
import BasicImage from '../Img/BasicImage';

const MatchStats = ({ data, searchName, spidData, seasonData }) => {
  const [totalData, setTotalData] = useState({});
  const [topRating, setTopRating] = useState({});
  const [topScore, setTopScore] = useState({});
  const [topAssist, setTopAssist] = useState({});

  // 조회된 경기 정보
  useEffect(() => {
    if (data && data.matches) {
      let totalWins = 0;
      let totalDraws = 0;
      let totalLosses = 0;
      let totalRating = 0;
      let totalPossession = 0;
      let totalGoal = 0;
      let totalShoot = 0;
      let totalPassSuccess = 0;
      let totalPassTry = 0;

      data.matches.forEach((match) => {
        const matchDetail = match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail;
        if (matchDetail) {
          // 승리, 무승부, 패배 카운트
          if (matchDetail.matchResult === '승') {
            totalWins++;
          } else if (matchDetail.matchResult === '무') {
            totalDraws++;
          } else if (matchDetail.matchResult === '패') {
            totalLosses++;
          }

          totalRating += matchDetail.averageRating; // 평점
          totalPossession += matchDetail.possession; // 점유율
          totalGoal += match.matchInfo.find((item) => item.nickname === searchName)?.shoot.goalTotal; // 골 수
          totalShoot += match.matchInfo.find((item) => item.nickname === searchName)?.shoot.shootTotal; // 슈팅 수
          totalPassSuccess += match.matchInfo.find((item) => item.nickname === searchName)?.pass.passSuccess; // 패스 성공 수
          totalPassTry += match.matchInfo.find((item) => item.nickname === searchName)?.pass.passTry; // 패스 시도 수
        }
      });

      const shootRate = totalShoot !== 0 ? ((totalGoal / totalShoot) * 100).toFixed(1) : 0;
      const passRate = totalPassTry !== 0 ? ((totalPassSuccess / totalPassTry) * 100).toFixed(1) : 0;

      setTotalData({
        win: totalWins,
        draw: totalDraws,
        loss: totalLosses,
        rating: totalRating,
        possession: totalPossession,
        shoot: shootRate,
        pass: passRate,
      });
    }
  }, [data]);

  // 조회된 경기 베스트플레이어
  useEffect(() => {
    if (data && data.matches) {
      // 선수별 성적을 저장할 객체들 초기화
      let playerStats = {};

      // 모든 매치를 순회하며 선수별 성적을 누적
      data.matches.forEach((match) => {
        match.matchInfo
          .find((item) => item.nickname === searchName)
          ?.player.forEach((player) => {
            const playerId = player.spId;
            if (!playerStats[playerId]) {
              // 새로운 선수일 경우 초기화
              playerStats[playerId] = {
                goals: 0,
                rating: 0,
                assists: 0,
                count: 0, // 출전 횟수 추가
              };
            }

            // 골 수 누적
            playerStats[playerId].goals += player.status.goal;

            // spRating 누적
            playerStats[playerId].rating += player.status.spRating;

            // 어시스트 수 누적
            playerStats[playerId].assists += player.status.assist;

            // 출전 횟수 누적
            playerStats[playerId].count += 1;
          });
      });

      // 가장 많은 골을 넣은 선수 찾기
      let topScorer = null;
      let maxGoals = 0;
      // 가장 높은 spRating을 가진 선수 찾기
      let topRatinger = null;
      let maxRating = 0;
      // 가장 많은 어시스트를 기록한 선수 찾기
      let topAssister = null;
      let maxAssists = 0;

      // 선수별 성적을 순회하며 최고 성적을 찾음
      for (const playerId in playerStats) {
        const stats = playerStats[playerId];

        // 가장 많은 골을 넣은 선수 찾기
        if (stats.goals > maxGoals) {
          maxGoals = stats.goals;
          topScorer = playerId;
        }

        // 가장 높은 spRating을 가진 선수 찾기
        if (stats.rating > maxRating) {
          maxRating = stats.rating;
          topRatinger = playerId;
        }

        // 가장 많은 어시스트를 기록한 선수 찾기
        if (stats.assists > maxAssists) {
          maxAssists = stats.assists;
          topAssister = playerId;
        }
      }

      setTopRating({ spId: parseInt(topRatinger), rating: maxRating, count: playerStats[topRatinger]?.count });
      setTopScore({ spId: parseInt(topScorer), goal: maxGoals, count: playerStats[topScorer]?.count });
      setTopAssist({ spId: parseInt(topAssister), assist: maxAssists, count: playerStats[topAssister]?.count });
    }
  }, [data]);

  const findName = (playerSpid) => {
    return spidData.find((spid) => spid.id === playerSpid)?.name;
  };

  const seasonImg = (playerSpid) => {
    return seasonData.find((season) => season.seasonId === Math.floor(playerSpid / 1000000))?.seasonImg;
  };

  if (!data || !spidData) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="match__stats">
      <div className="stats__inner">
        <div className="match__average">
          <div className="record">
            <div className="progress">
              <CircularProgressbarWithChildren value={Math.round((totalData.win / (totalData.win + totalData.draw + totalData.loss)) * 100)} strokeWidth={16} circleRatio={1} styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#05cb55', trailColor: '#d6d6d6' })}>
                <div className="progress-text">{Math.round((totalData.win / (totalData.win + totalData.draw + totalData.loss)) * 100)}%</div>
              </CircularProgressbarWithChildren>
            </div>
            <span>
              {totalData.win}승 {totalData.draw}무 {totalData.loss}패
            </span>
          </div>

          <div className="rate">
            <p>평점 {(totalData.rating / data.matches.length).toFixed(1)}</p>
            <p>점유율 {(totalData.possession / data.matches.length).toFixed(1)}%</p>
            <p>공격성공률 {totalData.shoot}%</p>
            <p>패스성공률 {totalData.pass}%</p>
          </div>
        </div>
        <div className="best__plyer">
          <h3>베스트 선수</h3>
          <ul>
            <li>
              <div className="player">
                <PlayerImage2 src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${topRating.spId}.png`} />

                <div className="text">
                  <div className="name">
                    {seasonImg(topRating.spId) && <BasicImage  src={seasonImg(topRating.spId)} width={16} height={13} quality={70} alt="시즌 이미지" />}
                    <span>{findName(topRating.spId)}</span>
                  </div>
                  <span>평점 {(topRating.rating / topRating.count).toFixed(1)}</span>
                </div>
              </div>
            </li>

            <li>
              <div className="player">
                <PlayerImage2 src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${topScore.spId}.png`} />

                <div className="text">
                  <div className="name">
                    {seasonImg(topScore.spId) && <BasicImage src={seasonImg(topScore.spId)} width={16} height={13} quality={70} alt="시즌 이미지" />}
                    <span>{findName(topScore.spId)}</span>
                  </div>
                  <span>득점 {topScore.goal}</span>
                </div>
              </div>
            </li>

            <li>
              <div className="player">
                <PlayerImage2 src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${topAssist.spId}.png`} />

                <div className="text">
                  <div className="name">
                    {seasonImg(topAssist.spId) && <BasicImage src={seasonImg(topAssist.spId)} width={16} height={13} quality={70} alt="시즌 이미지" />}
                    <span>{findName(topAssist.spId)}</span>
                  </div>
                  <span>도움 {topAssist.assist}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
