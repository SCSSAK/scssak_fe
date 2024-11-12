import React from 'react';
import ArticleList from './ArticleList';

const ArticleBoardPage = () => {
  return (
    <div>
      <h1>게시판</h1>
      {/* 필요한 props를 넣어 ArticleList를 렌더링 */}
      <ArticleList openType={1} />
    </div>
  );
};

export default ArticleBoardPage;
