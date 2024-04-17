'use client'

import Search from '@/components/Search/Search';
import MainSlider from '@/components/Slider/MainSlider';
import MainNotice from '@/components/Board/MainNotice';
import Calculator from '@/components/Calculator/Calculator';
import CoupangAd from '@/components/AD/CoupangAd';
import { useScrollHandler } from '@/utils/useScrollAd';
import CoupangAd2 from '@/components/AD/CoupangAd2';

const Main = () => {
  // 광고
  useScrollHandler('.ad__banner2', 100);

  return (
    <>
      <MainSlider />
      <div className="main__search">
        <Search />
      </div>
      <div className="container">
        <aside className="ad__banner mt35 mb0">
          <CoupangAd />
        </aside>
      </div>
      <div className="box__wrap">
        <MainNotice />
        <Calculator />
      </div>
      <CoupangAd2 position={'left'} />
      <CoupangAd2 position={'right'} />
    </>
  );
};

export default Main;
