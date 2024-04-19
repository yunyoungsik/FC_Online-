'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useData } from '@/context/DataContext';
import PlayerImage from '../Img/PlayerImage';
import BasicImage from '../Img/BasicImage';

const Players = ({ matchtype, players, position }) => {
  const { spidData, seasonData, positionData } = useData();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`/api/stats/${matchtype}/${players}/${position}`, {
          matchtype,
          players,
          position,
        });
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Players API Error', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [matchtype, players, position]);

  if (loading) {
    return (
      <tr className="loading">
        <td className="loader"></td>
      </tr>
    );
  }

  return (
    <>
      {data.playersData?.map((player, index) => {
        const playerName = spidData.find((spid) => spid.id === player.spid)?.name;
        const seasonImg = seasonData.find((season) => season.seasonId === Math.floor(player.spid / 1000000))?.seasonImg;
        const positionDesc = positionData.find((position) => position.spposition === player.spPosition)?.desc;

        return (
          <tr key={index}>
            <td>
              <div className='imgWrap'>
                <div className='playerImg'>
                  <PlayerImage src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spid}.png`} />
                </div>
                <div className="name">
                  <BasicImage src={seasonImg} width={16} height={13} quality={70} alt={`${playerName} ${player.name}`} />
                  <p>{playerName}</p>
                </div>
              </div>
            </td>
            <td>
              <div className="position">
                <p>{positionDesc}</p>
              </div>
            </td>
            <td><p>{player.status.matchCount}</p></td>
            <td>
              <p>{player.status.goal.toFixed(1)} / {player.status.assist.toFixed(1)}</p>
            </td>
            <td>
              <p>{player.status.effectiveShoot.toFixed(1)} / {player.status.shoot.toFixed(1)}</p>
              <p className='raiting'>{Math.floor((player.status.effectiveShoot / player.status.shoot || 1) * 100)}%</p>
            </td>
            <td>
              <p>{player.status.passSuccess.toFixed(1)} / {player.status.passTry.toFixed(1)}</p>
              <p className='raiting'>{Math.floor((player.status.passSuccess / (player.status.passTry || 1)) * 100)}%</p>
            </td>
            <td>
              <p>{player.status.dribbleSuccess.toFixed(1)} / {player.status.dribbleTry.toFixed(1)}</p>
              <p className='raiting'>{player.status.dribble.toFixed(1)}yard</p>              
            </td>
            <td><p>{player.status.block.toFixed(1)}</p></td>
            <td><p>{player.status.tackle.toFixed(1)}</p></td>
          </tr>
        );
      })}
    </>
  );
};

export default Players;