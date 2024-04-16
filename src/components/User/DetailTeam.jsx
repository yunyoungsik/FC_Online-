import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PlayerImage from '../Img/PlayerImage';

const DetailTeam = ({ match, matchType, infoNum, spidData, seasonData, positionData }) => {
  return (
    <table className="team1">
      <colgroup>
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '5%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '5%' }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={2}>{match.matchInfo[infoNum]?.nickname}</th>
          <th>포지션</th>
          <th>득점/도움</th>
          <th>경고/퇴장</th>
          <th>유효슛/슈팅</th>
          <th>패스성공/시도</th>
          <th>드리블성공/시도</th>
          <th>블락성공/시도</th>
          <th>태클성공/시도</th>
          <th title="선방">선방</th>
        </tr>
      </thead>
      <tbody>
        {match.matchInfo[infoNum]?.player.map((player, index) => {
          const playerInfo = spidData.find((spid) => spid.id === player.spId);
          const seasonInfo = seasonData.find((season) => season.seasonId === Math.floor(player.spId / 1000000));
          const positionInfo = positionData.find((position) => position.spposition === player.spPosition);

          return (
            <tr key={index}>
              {/* 선수 이미지 */}
              <td>
                <div className="playerImg">
                  <PlayerImage src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`} />
                </div>
              </td>

              {/* 선수 이름, 포지션, 강화 등 */}
              <td className="name">
                <div className='name__inner'>
                  <Image src={seasonInfo?.seasonImg} width={16} height={13} alt={`${seasonInfo?.className} ${player.name}`} />
                  <Link href={`/stats/${matchType}/${player.spId}/${player.spPosition}`}>{playerInfo?.name}</Link>{' '}
                  <span className={`buildup__${player.spGrade}`}>{player.spGrade}</span>
                </div>
              </td>

              {/* 포지션 */}
              <td>{positionInfo?.desc}</td>

              {/* 득점/도움 */}
              <td>
                <p>
                  {player.status.goal} / {player.status.assist}
                </p>
                <p className="rating">{player.status.spRating}</p>
              </td>

              {/* 경고/퇴장 */}
              <td>
                <p>
                  {player.status.yellowCards} / {player.status.redCards}
                </p>
              </td>

              {/* 공격 */}
              <td>
                <p>
                  {player.status.effectiveShoot} / {player.status.shoot}
                </p>
                <p className="rating">{Math.floor((player.status.effectiveShoot / (player.status.shoot || 1)) * 100)}%</p>
              </td>

              {/* 패스 */}
              <td>
                <p>
                  {player.status.passSuccess} / {player.status.passTry}
                </p>
                <p className="rating">{Math.floor((player.status.passSuccess / (player.status.passTry || 1)) * 100)}%</p>
              </td>

              {/* 드리블 */}
              <td>
                <p>
                  {player.status.dribbleSuccess} / {player.status.dribbleTry}
                </p>
                <p className="rating">{player.status.dribble}yard</p>
              </td>

              {/* 수비 */}
              <td>
                <p>
                  {player.status.block} / {player.status.blockTry}
                </p>
                <p className="rating">
                  {Math.floor((player.status.block / (player.status.blockTry || 1)) * 100)}%
                </p>
              </td>

               {/* 수비 */}
               <td>
                <p>
                  {player.status.tackle} / {player.status.tackleTry}
                </p>
                <p className="rating">
                  {Math.floor((player.status.tackle / (player.status.tackleTry || 1)) * 100)}%
                </p>
              </td>

              {/* 골키퍼 */}
              <td>
                <p>{player.status.defending}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetailTeam;