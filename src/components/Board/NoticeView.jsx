'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import timeAgo from '@/utils/timeAgo';
import memberRank from '@/utils/memberRank';
import CoupangAd from '../AD/CoupangAd';
import { useScrollHandler } from '@/utils/useScrollAd';
import CoupangAd2 from '../AD/CoupangAd2';

const NoticeView = ({ postId }) => {
  // console.log(postId)
  const [data, setData] = useState('');
  // console.log(data)
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // const handleProfileClick = () => {
  //   // console.log(post);
  //   if (post.creator._id === session?.user.id) return router.push('/profile');
  //   router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  // };

  const fetchNotice = async () => {
    const response = await fetch(`/api/notice/${postId}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchNotice();
  }, []);

   // 삭제
   const handleDelete = async () => {
    const hasConfirmed = confirm('게시물을 정말로 삭제하시겠습니까?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/notice/${data._id.toString()}`, {
          method: 'DELETE',
        });

        router.push('/notice');
      } catch (error) {
        console.error('Notice View Error', error);
      }
    }
  };

  // 수정
  const handleEdit = () => {
    router.push(`/notice-update/${data?._id}`);
  };

   // 광고
   useScrollHandler('.ad__banner2', 100);

  if (!data || data.length === 0) {
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

      <div className="notice__view">
        <div className="view__top">
          <h2>{data?.title}</h2>
          <ul className="view__info">
            <li>
              <span>{timeAgo(data.createdAt)}</span>
            </li>
            <li>
              <span>조회수 {data?.view}</span>
            </li>
            <li>
              <div className="creator">
                <Image src={`/images/rank/ico_${memberRank(data.creator?.role)}.webp`} width={18} height={18} alt="회원등급" />
                <span onClick={() => handleUserClick && handleUserClick(data.creator?.username)}>{data.creator?.role === 'admin' ? '운영자' : data.creator.name}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="view__content">
          <pre>{data?.desc}</pre>
        </div>

        <div className="view__btn">
          <div className="btn__wrap">
            {data?.creator._id === session?.user.id && (
              <>
                <button type="button" onClick={handleEdit} className="white-btn">
                  수정
                </button>
                <button type="button" onClick={handleDelete} className="white-btn">
                  삭제
                </button>
              </>
            )}
            <Link href="/notice" className="green-btn">
              목록으로
            </Link>
          </div>
        </div>
      </div>

      <CoupangAd2 position={'left'} />
      <CoupangAd2 position={'right'} />
    </>
  );
};

export default NoticeView;
