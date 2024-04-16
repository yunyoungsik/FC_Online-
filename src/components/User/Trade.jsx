'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trade = () => {
  const [data, setData] = useState('');
  console.log(data)
  const [tradetype, setTradetype] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://open.api.nexon.com/fconline/v1/user/trade?tradetype=${tradetype}&offset=${offset}&limit=${limit}`, {
          headers: { 'x-nxopen-api-key': process.env.NEXON_API }
        });
        const data = await res.json();
        setData(data)
      } catch (error) {
        console.error('Trade API Error', error);
      }
    }

    fetchData();
  }, [tradetype, offset, limit])

  return (
    <div>
      <div className="tradetype">
        <ul>
          <li value={'buy'} onClick={(e) => setTradetype(e.target.value)}>구매</li>
          <li value={'sell'} onClick={(e) => setTradetype(e.target.value)}>판매</li>
        </ul>
      </div>
    </div>
  );
};

export default Trade;
