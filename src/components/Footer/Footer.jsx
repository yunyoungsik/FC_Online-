'use client'

import React from 'react';
import { footerNav } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer id="footer" className={pathName === '/' ? 'm-footer' : 'black200'} role='contentinfo'>
      <div className="container">
        <ul className='footer__nav'>
          {footerNav.map((el, key) => (
            <li key={key}>
              <Link href={el.href}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>© All Rights Reserved. FCON.KR is not associated with NEXON Korea. Data based on NEXON Open API.</p>
      </div>
    </footer>
  );
}
