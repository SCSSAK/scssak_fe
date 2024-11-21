import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../styles/pages/ArticleBoardPage.css';
import ArticleList from '../components/article/ArticleList';
import {BASE_URL} from '../apis/apiUrls';

import {useRecoilValue} from 'recoil';
import {searchBarAtom} from '../recoil/atom';

// 게시글 타입 이미지 import
import typeAllActive from '../assets/images/article/typeAll_active.png';
import type1Active from '../assets/images/article/type1_active.png';
import type2Active from '../assets/images/article/type2_active.png';
import type3Active from '../assets/images/article/type3_active.png';
import type4Active from '../assets/images/article/type4_active.png';
import type5Active from '../assets/images/article/type5_active.png';
import typeAllInActive from '../assets/images/article/typeAll_inactive.png';
import type1InActive from '../assets/images/article/type1_inactive.png';
import type2InActive from '../assets/images/article/type2_inactive.png';
import type3InActive from '../assets/images/article/type3_inactive.png';
import type4InActive from '../assets/images/article/type4_inactive.png';
import type5InActive from '../assets/images/article/type5_inactive.png';

const ArticleBoardPage = () => {
  const {state} = useLocation();

  const [articleList, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // 기본값 설정
  const [activeType, setActiveType] = useState(
    state?.boardType ? 'type' + state.boardType : 'typeAll',
  );
  const [activeOpenType, setActiveOpenType] = useState('전체');
  const [activeSort, setActiveSort] = useState('latest'); // 기본값은 '최신순'

  // 검색바 전역 상태
  const searchBarState = useRecoilValue(searchBarAtom);

  const navigate = useNavigate();

  // 게시글 요청 함수
  const fetchArticles = async page => {
    const articleType =
      activeType === 'typeAll' ? '' : activeType.replace('type', '');
    const openType = activeOpenType === '전체' ? 1 : 2;

    try {
      setIsFetching(true); // 데이터 요청 시작
      let url = '';
      if (articleType) {
        url = `${BASE_URL}/article?article_type=${articleType}&open_type=${openType}&current_page=${page}`;
      } else {
        url = `${BASE_URL}/article?open_type=${openType}&current_page=${page}`;
      }
      if (searchBarState.searchKeywordLockIn) {
        url = url.concat(
          `&keyword=${encodeURIComponent(searchBarState.searchKeywordLockIn)}`,
        );
      }
      if (activeSort === 'popular') {
        url = url.concat(`&order_type=2`);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();

      console.log(data);

      // // 첫 번째 요청일 때
      // if (page === 1 && articleList.length === 0) {
      //   setArticles(data.article_list); // 첫 페이지에는 새로 로드한 데이터로 덮어쓰기
      //   console.log('1페이지 추가');
      //   console.log(articleList);
      // } else {
      //   // 두 번째 요청부터는 기존 데이터에 추가
      //   setArticles(prev => [...prev, ...data.article_list]);
      //   console.log('2페이지 이상 추가');
      //   console.log(articleList);
      // }

      // 새로 받은 게시글에서 중복된 article_id를 제거한 후 리스트에 추가하는 로직
      setArticles(prevArticles => {
        const existingArticleIds = new Set(
          prevArticles.map(article => article.article_id),
        );

        // 중복되지 않은 새 게시글만 필터링
        const newArticles = data.article_list.filter(
          article => !existingArticleIds.has(article.article_id),
        );

        return [...prevArticles, ...newArticles];
      });

      setTotalPages(data.total_page); // 총 페이지 수 갱신
      setIsFetching(false); // 데이터 요청 끝
    } catch (error) {
      console.error('Error fetching articles:', error);
      setIsFetching(false); // 데이터 요청 끝
    }
  };

  useEffect(() => {
    fetchArticles(currentPage); // 컴포넌트 초기 렌더링 시 호출
  }, [currentPage]); // 현재 페이지 변경 시 요청

  useEffect(() => {
    setTotalPages(1);
    setCurrentPage(1);
    setArticles([]);
    fetchArticles(currentPage); // 컴포넌트 초기 렌더링 시 호출
  }, [
    activeType,
    activeOpenType,
    activeSort,
    searchBarState.searchKeywordLockIn,
  ]); // 필터 변경 또는 검색 시 재요청

  const loadMore = useCallback(() => {
    // 페이지가 마지막 페이지에 도달하지 않고, isFetching이 false일 때만 페이지 증가
    console.log(currentPage, totalPages, isFetching);
    if (currentPage < totalPages && !isFetching) {
      setCurrentPage(prev => prev + 1); // 페이지 증가
    }
  }, [currentPage, totalPages, isFetching]);

  const handleClick = () => {
    navigate('/board/write');
  };

  return (
    <div className="board-page">
      {/* 게시글 타입 선택 버튼 */}
      <div className="type-buttons">
        <img
          src={activeType === 'typeAll' ? typeAllActive : typeAllInActive}
          alt="전체"
          className={`type-button ${activeType === 'typeAll' ? 'active' : ''}`}
          onClick={() => setActiveType('typeAll')}
        />
        <img
          src={activeType === 'type1' ? type1Active : type1InActive}
          alt="자유"
          className={`type-button ${activeType === 'type1' ? 'active' : ''}`}
          onClick={() => setActiveType('type1')}
        />
        <img
          src={activeType === 'type2' ? type2Active : type2InActive}
          alt="꿀팁"
          className={`type-button ${activeType === 'type2' ? 'active' : ''}`}
          onClick={() => setActiveType('type2')}
        />
        <img
          src={activeType === 'type3' ? type3Active : type3InActive}
          alt="질문"
          className={`type-button ${activeType === 'type3' ? 'active' : ''}`}
          onClick={() => setActiveType('type3')}
        />
        <img
          src={activeType === 'type4' ? type4Active : type4InActive}
          alt="칭찬"
          className={`type-button ${activeType === 'type4' ? 'active' : ''}`}
          onClick={() => setActiveType('type4')}
        />
        <img
          src={activeType === 'type5' ? type5Active : type5InActive}
          alt="자랑해요"
          className={`type-button ${activeType === 'type5' ? 'active' : ''}`}
          onClick={() => setActiveType('type5')}
        />
      </div>

      {/* 게시글 공개 범위 선택 */}
      <div className="open-type">
        <span
          className={`open-type-item ${activeOpenType === '전체' ? 'active' : ''}`}
          onClick={() => setActiveOpenType('전체')}>
          전체
        </span>
        {' | '}
        <span
          className={`open-type-item ${activeOpenType === '동기' ? 'active' : ''}`}
          onClick={() => setActiveOpenType('동기')}>
          동기
        </span>
      </div>

      {/* 공지 바 */}
      <div className="notice-bar">
        <span className="notice-label">공지</span>
        <span className="notice-message">
          욕설이나 비방글은 자동 삭제됩니다.
        </span>
      </div>

      {/* 최신순/좋아요순 정렬 선택 */}
      <div className="sort-buttons">
        <span
          className={`sort-button ${activeSort === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveSort('latest')}>
          최신 순
        </span>
        {' | '}
        <span
          className={`sort-button ${activeSort === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveSort('popular')}>
          좋아요 순
        </span>
      </div>

      {/* 게시글 목록 */}
      <ArticleList
        articles={articleList}
        loadMore={loadMore}
        isFetching={isFetching}
      />

      {/* 하단 글쓰기 버튼 */}
      <button className="write-button" onClick={handleClick}>
        글쓰기
      </button>
    </div>
  );
};

export default ArticleBoardPage;
