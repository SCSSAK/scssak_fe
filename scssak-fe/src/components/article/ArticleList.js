import React, {useState} from 'react';
import '../../assets/styles/ArticleList.css';
import defaultThumbnail from '../../assets/images/default_thumbnail.png';

const ArticleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // 예시를 위한 페이지 수

  const articles = Array.from({length: 10}, (_, index) => ({
    title: `게시글 제목 ${index + 1}`,
    content: `게시글 내용 ${index + 1}`,
    userName: '23기 조예지',
    date: '23.10.30',
    likeCount: 10,
    commentCount: 23,
    thumbnail: defaultThumbnail, // 썸네일 URL이 없을 경우 빈 문자열
  }));

  return (
    <div className="article-list">
      <ul className="articles">
        {articles.map((article, index) => (
          <li key={index} className="article-item">
            <div className="thumbnail">
              {article.thumbnail ? (
                <img src={article.thumbnail} alt="썸네일" />
              ) : (
                <div className="thumbnail-placeholder"></div>
              )}
            </div>
            <div className="article-info">
              <h3 className="title">{article.title}</h3>
              <p className="content">{article.content}</p>
              <div className="metadata">
                <span>{article.userName}</span> | <span>{article.date}</span>
              </div>
              <div className="stats">
                <span>💬 {article.commentCount}</span> |{' '}
                <span>❤️ {article.likeCount}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ArticleList;
