import React from 'react';
import ArticleForm from '../components/article/ArticleForm';

const ArticleWritePage = () => {
  const handleSubmit = formData => {
    console.log('게시글 작성:', formData);
    // API 호출 로직 추가
  };

  return <ArticleForm onSubmit={handleSubmit} />;
};

export default ArticleWritePage;
