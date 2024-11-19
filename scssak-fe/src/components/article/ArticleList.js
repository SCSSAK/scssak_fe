import React, {useEffect, useRef, useCallback} from 'react';
import '../../styles/components/article/ArticleList.css';
import defaultThumbnail from '../../assets/images/default_thumbnail.png';

const ArticleList = ({articles, loadMore, isFetching}) => {
  const observerRef = useRef(); // IntersectionObserver 저장
  const lastElementRef = useRef(null); // 마지막 요소 참조 저장

  // IntersectionObserver 초기화
  const initObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !isFetching) {
            console.log('마지막 요소 감지됨');
            loadMore(); // 추가 데이터 요청
          }
        },
        {threshold: 1.0}, // 요소가 완전히 보여질 때만 트리거
      );
    }
  }, [isFetching, loadMore]);

  // 마지막 요소 감지
  const observeLastElement = useCallback(node => {
    if (lastElementRef.current) {
      observerRef.current.unobserve(lastElementRef.current);
    }

    lastElementRef.current = node; // 마지막 요소를 업데이트
    if (node) observerRef.current.observe(node); // 새로운 마지막 요소 감지
  }, []);

  useEffect(() => {
    initObserver(); // Observer 초기화
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [initObserver]);

  useEffect(() => {
    // 새로운 데이터가 로딩될 때마다 마지막 요소를 감지
    if (articles.length > 0) {
      observeLastElement(document.querySelector('.article-item:last-child'));
    }
  }, [articles, observeLastElement]); // articles가 변경될 때마다 호출

  return (
    <div className="article-list">
      <ul className="articles">
        {articles.map((article, index) => (
          <li
            key={article.id || index} // 고유한 key로 id 사용
            className="article-item"
            ref={index === articles.length - 1 ? observeLastElement : null}>
            <div className="thumbnail">
              {article.article_thumbnail ? (
                <img src={article.article_thumbnail} alt="썸네일" />
              ) : (
                <img src={defaultThumbnail} alt="기본 썸네일" />
              )}
            </div>
            <div className="article-info">
              <p className="article-type">타입 {article.articleType}</p>
              <h3 className="title">{article.articleTitle}</h3>
              <p className="content">{article.articleContent}</p>
              <div className="metadata-stats">
                <span>
                  {article.articleUserName} | {article.articleCreatedAt}
                </span>
                <span className="stats">
                  💬 {article.articleCommentCount} | ❤️{' '}
                  {article.articleLikeCount}
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
