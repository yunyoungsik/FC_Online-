import axios from 'axios';
import { NextResponse } from 'next/server';

// API 호출을 담당하는 함수
const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { headers: { 'x-nxopen-api-key': process.env.NEXON_API } });
    return response.data;
  } catch (error) {
    console.error('Stat API Server Error', error);
    throw error;
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { matchtype, players, position } = body;
    // console.log(matchtype, players, position);

    const encodedPlayers = encodeURIComponent(JSON.stringify([{ id: players, po: position }]));
    // console.log(encodedPlayers)
    const playersData = await fetchData(`https://open.api.nexon.com/fconline/v1/ranker-stats?matchtype=${matchtype}&players=${encodedPlayers}`);
    // console.log(playersData)
    return new NextResponse(JSON.stringify({ playersData }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Stat POST Server Error' }, { status: 500 }));
  }
};