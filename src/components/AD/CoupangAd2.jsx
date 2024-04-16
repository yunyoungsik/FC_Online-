import React from 'react';

const CoupangAd2 = ({ position }) => {
  return <div className={`ad__banner2 ${position}`}>{position === 'left' ? <iframe src="https://ads-partners.coupang.com/widgets.html?id=772740&template=carousel&trackingCode=AF0760997&subId=&width=300&height=600&tsource=" width="300" height="600" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe> : <iframe src="https://ads-partners.coupang.com/widgets.html?id=772742&template=carousel&trackingCode=AF0760997&subId=&width=300&height=600&tsource=" width="300" height="600" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>}</div>;
};

export default CoupangAd2;
