'use client';

import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useRouter, useSearchParams } from 'next/navigation';

const NoticeUpdate = ({ postId }) => {
  // console.log(postId)
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const postId = searchParams.get('id');

  const [post, setPost] = useState({ title: '', desc: '' });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/notice/${postId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        desc: data.desc,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert('게시물 아이디가 다릅니다.');

    try {
      const response = await fetch(`/api/notice/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: post.title,
          desc: post.desc,
        }),
      });

      if (response.ok) {
        router.push('/notice');
      }
    } catch (error) {
      console.error('Notice Update Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (!session || session?.user.role !== 'admin') {
  //   return (
  //     <div className="loading">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  return <Form type="수정" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePost} />;
};

export default NoticeUpdate;
