import React from 'react';

const CoupangAd2 = ({ position }) => {
  return <div className={`ad__banner2 ${position}`}>{position === 'left' ? <iframe src="https://ads-partners.coupang.com/widgets.html?id=772740&template=carousel&trackingCode=AF0760997&subId=&width=300&height=600&tsource=" width="300" height="600" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url" ></iframe> : <iframe src="https://ads-partners.coupang.com/widgets.html?id=772742&template=carousel&trackingCode=AF0760997&subId=&width=300&height=600&tsource=" width="300" height="600" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url" ></iframe>}</div>;
};

export default CoupangAd2;
