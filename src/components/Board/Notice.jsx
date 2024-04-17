'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';
import NoticePagenation from './NoticePagenation';
import memberRank from '@/utils/memberRank';
import CoupangAd from '../AD/CoupangAd';
import { useScrollHandler } from '@/utils/useScrollAd';
import CoupangAd2 from '../AD/CoupangAd2';

const NoticeList = ({ data, handleUserClick }) => {
  return (
    <div className="notice__layout">
      <ul className="list">
        <li className="tit">
          <div className="number">번호</div>
          <h3 className="text">제목</h3>
        </li>
        {data?.map((post) => (
          <li key={post._id}>
            <div className="number">{post.noticeNum}</div>
            <div className="text">
              <Link href={`/notice/${post._id}`}>
                <h3 className="ellipsis-test">
                  <span>{post.title}</span>
                </h3>
              </Link>
              <ul className="info">
                <li>
                  <span>{timeAgo(post.createdAt)}</span>
                </li>
                <li>
                  <span>조회수 {post.view}</span>
                </li>
                <li>
                  <div className="creator">
                    <Image src={`/images/rank/ico_${memberRank(post.creator?.role)}.webp`} width={13} height={13} alt="회원등급" />
                    <span onClick={() => handleUserClick && handleUserClick(post.creator?.username)}>{post.creator?.role === 'admin' ? '운영자' : post.creator.name}</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notice = ({ page }) => {
  const { data: session } = useSession();
  // console.log(session);
  const [allPosts, setAllPosts] = useState([]);
  const [count, setCount] = useState(null);
  // console.log(allPosts);
  const [loading, setLoading] = useState(true);

  // 검색
  const [searchText, setSearchText] = useState('');
  const [searchTimout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`/api/notice?page=${page}`);
      const data = await response.json();
      setAllPosts(data.notices);
      setCount(data.count);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Notice Error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterNotice = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return allPosts.filter((item) => regex.test(item.creator?.username) || regex.test(item.title) || regex.test(item.desc));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterNotice(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleUserClick = (user) => {
    setSearchText(user);

    const searchResult = filterNotice(user);
    setSearchedResults(searchResult);
  };

  // 페이지
  const postView = 10;

  useEffect(() => {
    const fetchPagePost = async () => {
      try {
        const data = await fetchPosts(page);
        setAllPosts(data.notices);
        setCount(data.count);
      } catch (error) {
        console.error('Notice Page Error', error);
      }
    };

    fetchPagePost();
  }, [page]);

  // 광고
  useScrollHandler('.ad__banner2', 100);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="ad__banner mY08Wauto">
        <CoupangAd />
      </div>

      <section className="notice__list">
        <div className="notice__top">
          <h2>공지사항</h2>
          <div className="search__wrap">
            <form className="search__form">
              <label htmlFor="notice__search">공지사항 검색</label>
              <input type="text" placeholder="검색" name="notice__search" id="notice__search" value={searchText} onChange={handleSearchChange} required />
            </form>
            {session?.user.role === 'admin' && (
              <Link href="/notice-write" className="green-btn">
                <span>글쓰기</span>
              </Link>
            )}
          </div>
        </div>

        {searchText ? <NoticeList data={searchedResults} handleUserClick={handleUserClick} /> : <NoticeList data={allPosts} handleUserClick={handleUserClick} />}
      </section>
      <NoticePagenation page={page} count={count} postView={postView} />

      <CoupangAd2 position={'left'} />
      <CoupangAd2 position={'right'} />
    </>
  );
};

export default Notice;
