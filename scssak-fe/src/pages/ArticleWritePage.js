import React from 'react';
import ArticleForm from '../components/article/ArticleForm';
import {BASE_URL} from '../router/Routes';

const ArticleWritePage = () => {
  const handleSubmit = async formData => {
    try {
      const auth = `Bearer ` + localStorage.getItem('access_token');
      // con  sole.log(auth);
      const response = await fetch(BASE_URL + '/article', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: auth,
        },
      });

      if (response.ok) {
        console.log('게시글 작성 성공');
        // 성공 시 추가 처리 (예: 페이지 이동 등)
      } else {
        console.error('서버 에러가 발생했습니다.', response.error);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  return <ArticleForm onSubmit={handleSubmit} initialData={null} />;
};

export default ArticleWritePage;
