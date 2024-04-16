export default function memberRank(role) {
  const divisionMapping = {
    admin: 'rank0',
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
    member: 'rank17',
  };
  
  return divisionMapping[role] || '';
}