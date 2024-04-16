'use client';

import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';
import Search from '../Search/Search';
import { usePathname } from 'next/navigation';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [toggleName, setToggleName] = useState(false);
  const [eidtName, setEditName] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignIn = (providerId) => {
    signIn(providerId);
  };

  const handleSignOut = () => {
    setToggleDropdown(false);
    signOut();
  };

  // 닉네임 표시
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/profile/${session.user.id.toString()}`, {
            method: 'POST'
          });

          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.name);
          } else {
            console.error('Header fetch user data Error');
          }
        } catch (error) {
          console.error('Header fetching user data Error', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  // 닉네임 변경
  const updateName = async () => {
    const hasConfirmed = confirm('닉네임을 변경하시겠습니까?');

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/profile/${session?.user.id.toString()}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: eidtName,
          }),
        });

        if (response.ok) {
          location.reload()
        }
      } catch (error) {
        console.error('Header Update Name Error', error);
      }
    }
  };

  // 탈퇴
  const handleDelete = async () => {
    const hasConfirmed = confirm('정말로 탈퇴하시겠습니까?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/profile/${session?.user.id.toString()}`, {
          method: 'DELETE',
        });

        signOut();
      } catch (error) {
        console.error('Header Delete User Error', error);
      }
    }
  };

  const renderUserButtons = () => {
    if (session?.user) {
      return (
        <div className="user__profile">
          <Image src={session.user.image} width={37} height={37} className="rounded-full" alt="profile" onClick={() => setToggleDropdown(!toggleDropdown)} />
          {toggleDropdown && (
            <div className="dropdown">
              <div className="dropdown__wrap">
                <div className="top">
                  {!toggleName ? (
                    <>
                      <h2 className="ellipsis-test">{username}</h2>
                      <button type="button" onClick={() => setToggleName(!toggleName)} className="eidt">
                        닉네임 변경
                      </button>
                    </>
                  ) : (
                    <>
                      <input value={eidtName} placeholder="닉네임(2~10글자)" minLength={2} maxLength={10} onChange={(e) => setEditName(e.target.value)} />
                      <button type="button" onClick={() => setToggleName(!toggleName)} className="cancel">
                        취소
                      </button>
                      <button type="button" onClick={updateName} className="change">
                        변경
                      </button>
                    </>
                  )}
                </div>
                <div className="bottom">
                  <p className="ellipsis-test">{session?.user.email}</p>
                  <button type="button" onClick={handleDelete}>
                    회원탈퇴
                  </button>
                </div>
              </div>
              <button type="button" onClick={handleSignOut} className="green-btn">
                로그아웃
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => handleSignIn(provider.id)} className="trans-btn">
                로그인
              </button>
            ))}
        </>
      );
    }
  };

  return (
    <header id="header" role="banner">
      <div className="container">
        <div className="header__top">
          <Link href="/">
            <h1 className="logo">ON.KR</h1>
          </Link>
          <Nav pathName={pathName} session={session} providers={providers} />
        </div>
        {pathName !== '/' && (
          <>
            <div className="user__search">
              <Search />
            </div>
            <div className="user__button">{renderUserButtons()}</div>
          </>
        )}
        {pathName === '/' && <div className="user__button">{renderUserButtons()}</div>}
      </div>
    </header>
  );
}
