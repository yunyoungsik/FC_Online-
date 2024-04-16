import React from 'react';
import Link from 'next/link';
import CoupangAd from '../AD/CoupangAd';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <>
      <div className="ad__banner mY08Wauto">
        <CoupangAd />
      </div>

      <div className="write__form">
        <form onSubmit={handleSubmit} className="view__content">
          <label htmlFor="post__title" className="form__top">
            <span className="title__span hidden">제목</span>
            <input id="post__title" name="post__title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} type="text" placeholder="제목" required />
          </label>

          <label htmlFor="post__desc" className="form__desc">
            <span className="desc__span hidden">글을 작성해주세요.</span>
            <textarea id="post__desc" name="post__desc" value={post.desc} onChange={(e) => setPost({ ...post, desc: e.target.value })} placeholder="내용" required />
          </label>

          <div className="form__btn">
            <div className="btn__wrap">
              <Link href="/notice" className="white-btn">
                취소
              </Link>
              <button type="submit" disabled={submitting} className="white-btn">
                {submitting ? `${type}중` : type}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
