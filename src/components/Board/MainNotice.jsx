'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import timeAgo from '@/utils/timeAgo';

const MainNotice = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/notice?page=1');
        const data = await response.json();
        setAllPosts(data.notices);
        setLoading(false);
      } catch (error) {
        console.error('Main Notice Error', error);
        setLoading(false);

      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading box left">
        <div className="loader-black"></div>
      </div>
    );
  }

  return (
    <section className="main__notice box left">
      <h2>
        <Link href="/notice">공지사항</Link>
      </h2>

      <ul className="list">
        {allPosts
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((post, index) => (
            <li key={index}>
              <Link href={`/notice/${post._id}`}>
                <div className="number">{index + 1}</div>
                <div className="text">
                  <h3 className="ellipsis-test">
                    <span>{post.title}</span>
                  </h3>
                  <ul>
                    <li>{timeAgo(post.createdAt)}</li>
                    <li>조회수 {post.view}</li>
                    <li>{post.creator.role === 'admin' ? '운영자' : post.creator.name}</li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default MainNotice;
