'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Form from './Form';

const NoticeWrite = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || session?.user.role !== 'admin') {
      alert('운영자만 공지사항을 작성할 수 있습니다.');
      router.push('notice');
    }
  }, []);

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ title: '', desc: '' });

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notice/write', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          title: post.title,
          desc: post.desc,
        }),
      });

      if (response.ok) {
        router.push('/notice');
      }
    } catch (error) {
      console.error('Notice Write Error',error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session || session?.user.role !== 'admin') {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }
  
  return <Form type="작성" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPost} />;
};

export default NoticeWrite;
