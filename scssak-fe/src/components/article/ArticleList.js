import React, {useState, useEffect, useRef, useCallback} from 'react';
import '../../styles/components/article/ArticleList.css';
import defaultThumbnail from '../../assets/images/default_thumbnail.png';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const totalPages = 3; // 예시를 위한 총 페이지 수
  const articlesPerPage = 10; // 한 페이지에 표시할 게시물 수

  const observerRef = useRef();

  // 페이지에 따른 새 데이터 생성 (중복 방지)
  const fetchArticles = page => {
    return Array.from({length: articlesPerPage}, (_, index) => {
      const articleId = (page - 1) * articlesPerPage + index + 1;
      return {
        id: articleId, // 각 게시물에 고유 ID 추가
        article_type: '자유 게시판', // 예시 게시글 타입 추가
        title: `게시글 제목 ${articleId}`,
        content: `게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용 ${articleId}`,
        userName: '23기 조예지',
        date: '23.10.30',
        likeCount: 10,
        commentCount: 23,
        thumbnail: defaultThumbnail,
      };
    });
  };

  // 페이지 변경 시 새로운 게시글 불러오기
  useEffect(() => {
    const loadArticles = async () => {
      if (isFetching || currentPage > totalPages) return;

      setIsFetching(true);
      const newArticles = fetchArticles(currentPage);

      // 중복되지 않는 게시물만 추가
      setArticles(prevArticles => {
        const articleIds = new Set(prevArticles.map(article => article.id));
        const uniqueArticles = newArticles.filter(
          article => !articleIds.has(article.id),
        );
        return [...prevArticles, ...uniqueArticles];
      });

      setIsFetching(false);
    };

    loadArticles();
  }, [currentPage]);

  // IntersectionObserver를 이용한 무한 스크롤 처리
  const lastArticleElementRef = useCallback(
    node => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, currentPage, totalPages],
  );

  return (
    <div className="article-list">
      <ul className="articles">
        {articles.map((article, index) => (
          <li
            key={article.id} // 각 게시물의 id를 key로 사용
            className="article-item"
            ref={index === articles.length - 1 ? lastArticleElementRef : null}>
            <div className="thumbnail">
              {article.thumbnail ? (
                <img src={article.thumbnail} alt="썸네일" />
              ) : (
                <div className="thumbnail-placeholder"></div>
              )}
            </div>
            <div className="article-info">
              <p className="article-type">{article.article_type}</p>
              <h3 className="title">{article.title}</h3>
              <p className="content">{article.content}</p>
              <div className="metadata-stats">
                <span>
                  {article.userName} | {article.date}
                </span>
                <span className="stats">
                  💬 {article.commentCount} | ❤️ {article.likeCount}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default ArticleList;
