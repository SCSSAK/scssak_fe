import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import {API_AUTH} from '../../apis/apiSettings';
import {ARTICLE_URL} from '../../apis/apiUrls';

import {loginRoute} from '../../router/Routes';

import {iconList, iconComment, iconHeart} from '../../assets/images/index';
import {boardTypes} from '../../assets/Strings';

import styles from '../../styles/components/profile/ProfileArticleList.module.css';

export default function ArticleList({userId}) {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  // 데이터
  const [isFetching, setIsFetching] = useState(false); // 현재 가져오는 중인가?
  const [articleList, setArticleList] = useState([]); // 게시글 목록
  const [currentPage, setCurrentPage] = useState(1); // 마지막으로 불러온 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const observerRef = useRef(); // IntersectionObserver
  const lastElementRef = useRef(); // 게시글 목록의 마지막 요소

  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages, isFetching]);

  const initObserver = useCallback(() => {
    if (!observerRef.current) {
      // IntersectionObserver
      // :스크롤 감지해서 게시글 목록의 마지막 요소가 화면에 표시되면 페이지 증가
      observerRef.current = new IntersectionObserver(
        entries => {
          // 현재 마지막 페이지가 아니고,
          // isFetching이 false일 때만 페이지 증가
          if (entries && entries[0].isIntersecting) {
            loadMore();
          }
        },
        {threshold: 0.9}, // 요소가 거의 다 보였을 때 트리거
      );
    }
  }, [isFetching, loadMore]);

  // Observer 초기화
  useEffect(() => {
    initObserver();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [totalPages, initObserver]);

  // articleList가 변경될 때, 스크롤 감지 대상이 될 마지막 요소 변경
  useEffect(() => {
    if (articleList.length > 0) {
      const lastElement = document.querySelector(
        `.${styles.containerArticleItem}:last-child`,
      );

      if (lastElementRef.current) {
        observerRef.current.unobserve(lastElementRef.current);
      }
      lastElementRef.current = lastElement; // 마지막 요소 업데이트
      observerRef.current.observe(lastElement); // 새로운 마지막 요소 감지
    }
  }, [articleList]);

  // 현재 페이지가 변화하면 게시글을 요청
  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  // 게시글 요청
  const fetchArticles = () => {
    setIsFetching(true); // 데이터 요청 시작

    const params = {open_type: 3, writer_id: userId, current_page: currentPage};

    API_AUTH.get(ARTICLE_URL, {params})
      .then(({data}) => {
        // 첫 번째 요청일 때
        if (currentPage === 1) {
          setArticleList(data.article_list); // 덮어쓰기
        } else {
          // 두 번째 요청부터는 기존 데이터에 추가
          setArticleList(prev => [...prev, ...data.article_list]);
        }

        setTotalPages(data.total_page); // 총 페이지 수 갱신
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: () => navigate(loginRoute),
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
      })
      .finally(setIsFetching(false));
  };

  // 게시글 상세로 이동
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

      {articleList.map((article, index) => (
        <div
          key={article.article_id} // 각 게시물의 id를 key로 사용
          className={styles.containerArticleItem}
          ref={index === articleList.length - 1 ? lastElementRef : null}
          onClick={e => {
            handleClickArticle(article.article_id, e);
          }}>
          <div className={styles.containerArticleText}>
            <p className={styles.textArticleType}>
              {boardTypes[article.article_type]}
            </p>
            <p className={styles.textArticleTitle}>{article.article_title}</p>
          </div>

          <div className={styles.containerArticleInfo}>
            <img src={iconComment} alt="댓글 아이콘" />
            <span>{article.article_comment_count}</span>
            <img src={iconHeart} alt="좋아요 아이콘" />
            <span>{article.article_like_count}</span>
            <span>{article.article_created_at.split('T')[0]}</span>
          </div>
        </div>
      ))}

      {articleList.length == 0 && <p>작성한 글이 없습니다.</p>}

      {isFetching && <p>Loading...</p>}
    </div>
  );
}
