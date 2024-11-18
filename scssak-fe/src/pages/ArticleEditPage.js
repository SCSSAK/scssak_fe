import React from 'react';
import ArticleForm from '../components/article/ArticleForm';
import {BASE_URL} from '../router/Routes';

// article은 board, visibility, title, content 네가지 들어있는 형태로 받기
const ArticleEditPage = ({article}) => {
  const handleSubmit = async formData => {
    try {
      const auth = `Bearer ` + localStorage.getItem('access_token');
      console.log(auth);
      const response = await fetch(BASE_URL + '/article', {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: auth,
        },
      });

      if (response.ok) {
        console.log('게시글 작성 성공');
        // 성공 시 추가 처리 (예: 페이지 이동 등)
      } else if (response.status === 400) {
        console.error('잘못된 요청: 제목 또는 내용이 비어 있습니다.');
      } else if (response.status === 401) {
        console.error('로그인되지 않았습니다.');
      } else {
        console.error('서버 에러가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  return <ArticleForm onSubmit={handleSubmit} initialData={article} />;
};

export default ArticleEditPage;
