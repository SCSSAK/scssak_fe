import React from 'react';
import ArticleForm from '../components/article/ArticleForm';
import {BASE_URL} from '../apis/apiUrls';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

const ArticleWritePage = () => {
  const navigate = useNavigate(); // useNavigate 훅 선언

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const handleSubmit = async formData => {
    try {
      const auth = `Bearer ` + localStorage.getItem('access_token');
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
        const responseData = await response.json();
        navigate(`/board/${responseData.article_id}`);
      } else {
        const status = response.status;
        switch (status) {
          // 에러 처리 (400, 비유효 요청)
          case 400:
            setXModalState({
              isOpened: true,
              message: '게시판, 공개범위, 제목, 내용을\n모두 입력해주세요.',
            });
            break;

          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalState({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      }
    } catch (error) {
      setXModalState({
        isOpened: true,
        message: 'API 요청 중 오류 발생:' + error,
      });
    }
  };

  return (
    <ArticleForm
      isEditMode={false}
      onSubmit={handleSubmit}
      initialData={null}
    />
  );
};

export default ArticleWritePage;
