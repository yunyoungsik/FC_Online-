import Script from 'next/script';

const HorizontalAd = () => {
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4313698984582740"
        strategy="afterInteractive"
        crossorigin="anonymous"
      />
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4313698984582740"
        data-ad-slot="9634584262"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}

export default HorizontalAd;