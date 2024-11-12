import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = ({
  articleType = '',  // 게시글 타입 필터 (optional)
  openType = 1,      // 공개 범위 필터 (1: 전체 공개, 2: 기수 공개, 3: 둘 다)
  keyword = '',      // 검색 키워드 (optional)
  writerId = '',     // 특정 작성자 ID (optional)
  currentPage = 1,   // 현재 페이지 (기본값: 1)
}) => {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setError(null);

      // 동적 파라미터 설정
      const params = {
        open_type: openType,
        current_page: currentPage,
      };
      if (articleType) params.article_type = articleType;
      if (keyword) params.keyword = keyword;
      if (writerId) params.writer_id = writerId;

      // const response = await axios.get(`/api/v1/article`, { params });

      // if (response.status === 200) {
      //   setArticles(response.data.article_list);
      //   setTotalPages(response.data.total_page || 1); // 최소 1 페이지
      // }

      setArticles([
        {
          "article_title": "대예지",
          "article_content": "찬양",
          "article_user_name": "23기 조예지",
          "article_created_at": "2024-11-11",
          "article_like_count": 1,
          "article_comment_count": 1,
          "article_thumbnail": ""    // 없는 경우 빈 문자열
        },
        {
          "article_title": "게시글 제목",
          "article_content": "게시글 내용",
          "article_user_name": "23기 조예지",
          "article_created_at": "2024-11-11",
          "article_like_count": 1,
          "article_comment_count": 1,
          "article_thumbnail": ""
        }
      ]);
      setTotalPages(3);

    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError("요청한 페이지가 범위를 벗어났습니다.");
            break;
          case 401:
            setError("권한이 없습니다. 로그인 후 시도하세요.");
            break;
          case 404:
            setError("없는 게시글 타입입니다.");
            break;
          case 500:
            setError("서버에 문제가 발생했습니다.");
            break;
          default:
            setError("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        setError("네트워크 오류가 발생했습니다.");
      }
    }
  };

  // 검색 조건이 변경될 때마다 데이터 요청
  useEffect(() => {
    fetchArticles();
  }, [articleType, openType, keyword, writerId, currentPage]);

  return (
    <div>
      <h1>게시글 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <h2>{article.article_title}</h2>
            <p>{article.article_content}</p>
            <p>작성자: {article.article_user_name}</p>
            <p>작성일: {article.article_created_at}</p>
            <p>좋아요 수: {article.article_like_count}</p>
            <p>댓글 수: {article.article_comment_count}</p>
            {article.article_thumbnail && (
              <img src={article.article_thumbnail} alt="썸네일" style={{ width: '100px' }} />
            )}
          </li>
        ))}
      </ul>
      <div>
        {/* 페이지 네비게이션 */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default ArticleList;
