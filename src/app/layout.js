import '../assets/sass/styles.scss';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { DataProvider } from '@/context/DataContext';
import Provider from '@/context/SessionProvider';

import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  generator: 'Next.js',
  title: 'FC 온라인 검색 FCON.KR - FC 온라인 구단주와 선수 검색, 수수료 계산기',
  description: 'FC 온라인 구단주와 선수 검색 FCON.KR, FCON.KR에서 구단주와 선수를 검색해 보세요. 선수를 판매 시 받는 금액을 수수료 계산기로 미리 확인해 보세요.',
  keywords: ['FC Online, FC 온라인, FIFA Online, FIFA 온라인, 피파 온라인, 구단주 검색, 유저 검색, 선수 검색, 수수료 계산기'],
  authors: [{ name: 'Yun' }],
  creator: [{ name: 'Yun' }],
  publisher: [{ name: 'Yun' }],
  formatDetection: {
    email: 'fcon@outlook.kr',
  },
  icons: {
    icon: 'favicon.svg',
  },
  metadataBase: new URL('https://fcon.kr/'),
  images: 'https://fcon.kr/images/meta/meta.jpg',
  openGraph: {
    title: 'FC 온라인 검색 FCON.KR - FC 온라인 구단주와 선수 검색, 수수료 계산기',
    description: 'FC 온라인 유저 선수 검색 FCON.KR, FCON.KR에서 구단주와 선수를 검색해 보세요. 선수를 판매 시 받는 금액을 수수료 계산기로 미리 확인해 보세요.',
    url: 'https://fcon.kr/',
    siteName: 'FCON.KR',
    images: 'https://fcon.kr/images/meta/meta.jpg',
    locale: 'ko_KR',
    type: 'website',
    type: 'article',
    publishedTime: '2024-04-24T14:00:00.000Z',
    authors: ['Yun'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    Yeti: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FC 온라인 검색 FCON.KR - FC 온라인 구단주와 선수 검색, 수수료 계산기',
    description: 'FC 온라인 검색 사이트, 유저 검색, 선수 검색 수수료 계산기FC 온라인 유저 선수 검색 FCON.KR, FCON.KR에서 구단주와 선수를 검색해 보세요. 선수를 판매 시 받는 금액을 수수료 계산기로 미리 확인해 보세요.',
    images: ['https://fcon.kr/images/meta/meta.jpg'],
  },
  googleAdsenseAccount: 'ca-pub-4313698984582740',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSans.className} ${notoSans.variable}`}>
        {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4313698984582740" crossorigin="anonymous" /> */}
        <GoogleAnalytics gaId="G-HF5K9R7FD6" />
        <div className="wrap">
          <DataProvider>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
