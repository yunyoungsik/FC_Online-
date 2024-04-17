'use client';

import React, { useState } from 'react';

const Calculator = () => {
  const [sell, setSell] = useState('');
  const [discount, setDiscount] = useState('');
  const [togglePcBox, setTogglePcBox] = useState(false);
  const [toggleTopBox, setToggleTopBox] = useState(false);

  const handleTogglePcBox = () => {
    setTogglePcBox(!togglePcBox);
  };

  const handleToggleTopBox = () => {
    setToggleTopBox(!toggleTopBox);
  };

  const basicCommission = sell * 0.4;
  const eachDiscount = discount ? discount / 100 : 0;
  const totalDiscount = (togglePcBox ? 0.3 : 0) + (toggleTopBox ? 0.2 : 0);

  // const calculateFee = () => {
  //   return  (sell * 0.4) / ()
  // };

  return (
    <section className="calculator box right">
      <h2>수수료 계산기</h2>
      <form className="calculator__wrap">
        <div className="input__wrap">
          <div className="sell__wrap">
            <label htmlFor="sell">판매예정금액 </label>
            <div className="sell__input">
              <input type="text" pattern="[0-9]*" name="sell" id="sell" placeholder="판매 금액 입력" value={sell} onChange={(e) => setSell(e.target.value)} />
            </div>
          </div>
          <div className="discount__wrap">
            <label htmlFor="discount">할인쿠폰</label>
            <div className="discount__input">
              <input type="text" pattern="[0-9]*" name="discount" id="discount" placeholder="쿠폰" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="selectBox__wrap">
          <div className="pcBox selectBox">
            <div className="text">
              <span>프리미엄PC방(기본수수료 30% 할인)</span>
            </div>
            <div className="switch-btn" style={!togglePcBox ? { backgroundColor: 'var(--black200)' } : { backgroundColor: 'var(--green)' }} onClick={handleTogglePcBox}>
              <span className="ball" style={!togglePcBox ? { left: '0rem' } : { left: '2rem' }}></span>
            </div>
          </div>

          <div className="topBox selectBox">
            <div className="text">
              <span>TOP CLASS(기본수수료 20% 할인)</span>
            </div>
            <div className="switch-btn" style={!toggleTopBox ? { backgroundColor: 'var(--black200)' } : { backgroundColor: 'var(--green)' }} onClick={handleToggleTopBox}>
              <span className="ball" style={!toggleTopBox ? { left: '0rem' } : { left: '2rem' }}></span>
            </div>
          </div>
        </div>

        <div className="result">
          <ul>
            <li>
              <span className="tit">기본 수수료(40%)</span>
              <span>-{basicCommission.toLocaleString()} BP</span>
            </li>

            <li>
              <span className="tit">
                수수료 할인 금액<strong>(총 {totalDiscount * 100}%)</strong>
              </span>
              <span>+{(basicCommission * totalDiscount).toLocaleString()} BP</span>
            </li>

            <li>
              <span className="tit">개별 할인 금액({eachDiscount * 100}%)</span>
              <span>+{(basicCommission * eachDiscount).toLocaleString()} BP</span>
            </li>

            <li>
              <span className="tit">최종 수수료</span>
              <span>{(basicCommission - (basicCommission * totalDiscount + basicCommission * eachDiscount)).toLocaleString()} BP</span>
            </li>
          </ul>
        </div>
        <div className="total">
          <div className="total__wrap">
            <span>받는금액</span>
            <span>{(sell - (basicCommission - (basicCommission * totalDiscount + basicCommission * eachDiscount))).toLocaleString()} BP</span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Calculator;
