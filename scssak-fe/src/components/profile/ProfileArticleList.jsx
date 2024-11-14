import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import {iconList, iconComment, iconHeart} from '../../assets/images/index';

import styles from '../../styles/components/profile/ProfileArticleList.module.css';

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
        type: `게시판 종류 ${articleId}`,
        title: `게시글 제목 ${articleId}`,
        userName: '23기 조예지',
        date: '23.10.30',
        likeCount: 10,
        commentCount: 23,
      };
    });
  };

  // 페이지 변경 시 새로운 게시글 불러오기
  useEffect(() => {
    const loadArticles = async () => {
      if (isFetching || currentPage > totalPages) return;

      setIsFetching(true);
      // 실제 API 호출 시 fetchArticles를 API 호출로 대체
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

  // page 이동
  const navigate = useNavigate();

  const handleClickArticle = (article_id, e) => {
    e.preventDefault();
    navigate(`/board/${article_id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerArticleListTitle}>
        <img
          className={styles.imgArticleListIcon}
          src={iconList}
          alt="작성한 글 목록 아이콘"
        />
        <span className={styles.textArticleListTitle}>작성한 글 목록</span>
      </div>

      {articles.map((article, index) => (
        <div
          key={article.id} // 각 게시물의 id를 key로 사용
          className={styles.containerArticleItem}
          ref={index === articles.length - 1 ? lastArticleElementRef : null}
          onClick={e => handleClickArticle(article.id, e)}>
          <div className={styles.containerArticleText}>
            <p className={styles.textArticleType}>{article.type}</p>
            <p className={styles.textArticleTitle}>{article.title}</p>
          </div>

          <div className={styles.containerArticleInfo}>
            <img src={iconComment} alt="댓글 아이콘" />
            <span>{article.commentCount}</span>
            <img src={iconHeart} alt="좋아요 아이콘" />
            <span>{article.likeCount}</span>
            <span>{article.date}</span>
          </div>
        </div>
      ))}
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default ArticleList;
