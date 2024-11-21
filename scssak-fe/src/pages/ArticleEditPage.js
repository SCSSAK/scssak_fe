import React from 'react';
import ArticleForm from '../components/article/ArticleForm';
import {BASE_URL} from '../apis/apiUrls';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

// article은 board, visibility, title, content 네가지 들어있는 형태로 받기
const ArticleEditPage = () => {
  const location = useLocation();
  const article = location.state?.article; // 전달받은 article 데이터
  const articleId = location.state?.articleId; // 전달받은 article 데이터
  const navigate = useNavigate(); // useNavigate 훅 선언

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const handleSubmit = async requestData => {
    try {
      const auth = `Bearer ` + localStorage.getItem('access_token');
      console.log(auth);

      const response = await fetch(BASE_URL + `/article/${articleId}`, {
        method: 'PUT', // PUT 메서드로 수정 요청
        headers: {
          'Content-Type': 'application/json', // 요청 본문은 JSON 형식
          Authorization: auth, // Authorization 헤더에 Bearer 토큰 포함
        },
        body: JSON.stringify(requestData), // requestData를 JSON 문자열로 변환하여 전송
      });

      if (response.ok) {
        console.log('게시글 수정 성공');
        navigate(`/board/${articleId}`);
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
      isEditMode={true}
      onSubmit={handleSubmit}
      initialData={article}
    />
  );
};

export default ArticleEditPage;
