import React, {useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/components/article/ArticleList.css';
import defaultThumbnail from '../../assets/images/default_thumbnail.png';

const ArticleList = ({articles, loadMore, isFetching}) => {
  const observerRef = useRef(); // IntersectionObserver 저장
  const lastElementRef = useRef(null); // 마지막 요소 참조 저장
  const boardType = ['??', '자유', '꿀팁', '질문', '칭찬', '자랑'];
  const navigate = useNavigate(); // useNavigate 훅 선언

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
        {threshold: 0.9}, // 요소가 거의 다 보였을 때 트리거됨
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
            key={article.article_id || index} // 고유한 key로 id 사용
            onClick={() => navigate(`/board/${article.article_id}`)}
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
              <p className="article-type">{boardType[article.article_type]}</p>
              <h3 className="title">{article.article_title}</h3>
              <p className="content">{article.article_content}</p>
              <div className="metadata-stats">
                <span>
                  {article.article_user_name} |{' '}
                  {article.article_created_at.split('T')[0]}
                </span>
                <span className="stats">
                  💬 {article.article_comment_count} | ❤️{' '}
                  {article.article_like_count}
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
