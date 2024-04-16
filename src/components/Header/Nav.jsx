'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { nav } from '@/constants';
import { signIn, signOut } from 'next-auth/react';

export default function Nav({ pathName, session, providers }) {
  // console.log(pathName);
  const [isShow, setIsShow] = useState(false);
  const toogleMenu = () => {
    setIsShow((prevShow) => !prevShow);
  };

  return (
    <>
      <nav className={`nav ${isShow ? 'show' : ''}`} role="navigation" aria-label="메인 메뉴">
        <ul className="nav__list">
          {nav.map((item, index) => (
            <li key={index} className={pathName === item.href ? 'active' : ''}>
              <Link href={item.href} onClick={toogleMenu}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          {session?.user ? (
            <>
              <li className="mobile__login">
                <span
                  type="button"
                  onClick={() => {
                    signOut();
                    toogleMenu();
                  }}
                >
                  로그아웃
                </span>
              </li>
            </>
          ) : (
            <li className="mobile__login">
              {providers &&
                Object.values(providers).map((provider) => (
                  <span
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                      toogleMenu();
                    }}
                  >
                    로그인
                  </span>
                ))}
            </li>
          )}
        </ul>
      </nav>
      <div className="nav__mobile" id="navToggle" role="button" aria-label="Open Menu" aria-controls="primary-menu" aria-expanded={isShow ? 'true' : 'false'} onClick={toogleMenu}>
        <Image src={isShow ? '/images/svg/close.svg' : '/images/svg/menu.svg'} width={24} height={24} alt="menu img" />
      </div>
    </>
  );
}
