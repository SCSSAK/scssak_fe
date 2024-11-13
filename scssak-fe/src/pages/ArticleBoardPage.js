import React from 'react';

import '../styles/pages/ArticleBoardPage.css';
import ArticleList from '../components/article/ArticleList';

const ArticleBoardPage = () => {
  return (
    <div className="board-page">
      {/* 상단 로고 및 검색창 */}
      <div className="board-header">
        <div className="logo">🌱 슥싹</div>
        <input
          type="text"
          className="search-bar"
          placeholder="키워드로 게시글을 검색해주세요!"
        />
        <button className="search-button">🔍</button>
      </div>

      {/* 게시글 타입 선택 버튼 */}
      <div className="type-buttons">
        <button className="type-button active">자유</button>
        <button className="type-button">꿀팁</button>
        <button className="type-button">질문</button>
        <button className="type-button">칭찬</button>
        <button className="type-button">자랑해요</button>
      </div>

      {/* 게시글 공개 범위 선택 */}
      <div className="open-type">
        <span className="open-type-item active">전체</span> |{' '}
        <span className="open-type-item">동기</span>
      </div>

      {/* 공지 바 */}
      <div className="notice-bar">
        <span>공지</span>
        <span>욕설이나 비방글은 자동 삭제됩니다.</span>
      </div>

      {/* 게시글 목록 */}
      <ArticleList />
    </div>
  );
};

export default ArticleBoardPage;
