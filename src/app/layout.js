import '../assets/sass/styles.scss';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { DataProvider } from '@/context/DataContext';
import Provider from '@/context/SessionProvider';

import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto', weight: ['400', '700'] });

export const metadata = {
  generator: 'Next.js',
  title: 'FC 온라인 전적 검색 FCON.KR - 구단주와 선수, 전적 검색, 수수료 계산기',
  description: 'FC 온라인 구단주와 선수, 전적 검색 FCON.KR, 구단주와 선수, 전적을 검색하고 다양한 데이터를 확인하세요.',
  keywords: ['FC 온라인 전적 검색, FC Online, FC 온라인, FIFA Online, FIFA 온라인, 피파 온라인, 구단주 검색, 유저 검색, 선수 검색, 전적 검색, 수수료 계산기'],
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
  images: 'https://fcon.kr/images/meta/meta.webp',
  openGraph: {
    title: 'FC 온라인 전적 검색 FCON.KR - FC 온라인 구단주와 선수, 전적 검색, 수수료 계산기',
    description: 'FC 온라인 구단주와 선수, 전적 검색 FCON.KR, 구단주와 선수, 전적을 검색하고 다양한 데이터를 확인하세요.',
    url: 'https://fcon.kr/',
    siteName: 'FCON.KR',
    images: 'https://fcon.kr/images/meta/meta.webp',
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
    title: 'FC 온라인 전적 검색 FCON.KR - FC 온라인 구단주와 선수, 전적 검색, 수수료 계산기',
    description: 'FC 온라인 구단주와 선수, 전적 검색 FCON.KR, 구단주와 선수, 전적을 검색하고 다양한 데이터를 확인하세요.',
    images: ['https://fcon.kr/images/meta/meta.webp'],
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
