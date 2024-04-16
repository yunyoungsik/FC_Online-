import React from 'react';

const calculatePercentage = (value, total) => {
  return total !== 0 ? ((value / total) * 100).toFixed(1) : '0.0';
};

const renderTableRow = (label, value1, value2) => {
  return (
    <tr>
      <td>{value1}</td>
      <td>{label}</td>
      <td>{value2}</td>
    </tr>
  );
};

const DetailInfo = ({ match, detailActive }) => {
  const { matchInfo } = match;
  const team1 = matchInfo[0];
  const team2 = matchInfo[1];

  return (
    <div className={`info ${detailActive === 'info' ? 'active' : ''}`}>
      <table>
        <colgroup>
          <col style={{ width: '40%' }} />
          <col />
          <col style={{ width: '40%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{team1?.nickname}</th>
            <th>항목</th>
            <th>{team2?.nickname}</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRow('골', team1?.shoot.goalTotal, team2?.shoot.goalTotal)}
          {renderTableRow('슛', team1?.shoot.shootTotal, team2?.shoot.shootTotal)}
          {renderTableRow('유효슛', team1?.shoot.effectiveShootTotal, team2?.shoot.effectiveShootTotal)}
          {renderTableRow('공격 성공률', calculatePercentage(team1?.shoot.goalTotal, team1?.shoot.shootTotal) + '%', calculatePercentage(team2?.shoot.goalTotal, team2?.shoot.shootTotal) + '%')}
          {renderTableRow('패스 성공률', calculatePercentage(team1?.pass.passSuccess, team1?.pass.passTry) + '%', calculatePercentage(team2?.pass.passSuccess, team2?.pass.passTry) + '%')}
          {renderTableRow('점유율', team1?.matchDetail.possession + '%', team2?.matchDetail.possession + '%')}
          {renderTableRow('코너킥', team1?.matchDetail.cornerKick, team2?.matchDetail.cornerKick)}
          {renderTableRow('태클', team1?.defence.tackleSuccess, team2?.defence.tackleSuccess)}
          {renderTableRow('파울', team1?.matchDetail.foul, team2?.matchDetail.foul)}
          {renderTableRow('경고', team1?.matchDetail.yellowCards, team2?.matchDetail.yellowCards)}
          {renderTableRow('퇴장', team1?.matchDetail.redCards, team2?.matchDetail.redCards)}
          {renderTableRow('부상', team1?.matchDetail.injury, team2?.matchDetail.injury)}
        </tbody>
      </table>
    </div>
  );
};

export default DetailInfo;