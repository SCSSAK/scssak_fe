import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/pages/ArticleBoardPage.css';
import ArticleList from '../components/article/ArticleList';
import Logo from '../assets/images/logo.png';
import {BASE_URL} from '../router/Routes';

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
  const [articleList, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // 기본값 설정
  const [activeType, setActiveType] = useState('typeAll');
  const [activeOpenType, setActiveOpenType] = useState('전체');
  const [loadedPages, setloadedPages] = useState(0);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/board/write');
  };

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

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();

      console.log(data);

      // 첫 번째 요청일 때
      if (page === 1) {
        setArticles(data.article_list); // 첫 페이지에는 새로 로드한 데이터로 덮어쓰기
      } else {
        // 두 번째 요청부터는 기존 데이터에 추가
        setArticles(prev => [...prev, ...data.article_list]);
      }

      setTotalPages(data.total_page); // 총 페이지 수 갱신
      setIsFetching(false); // 데이터 요청 끝
    } catch (error) {
      console.error('Error fetching articles:', error);
      setIsFetching(false); // 데이터 요청 끝
    }
  };

  useEffect(() => {
    fetchArticles(currentPage); // 컴포넌트 초기 렌더링 시 호출
  }, [currentPage, activeType, activeOpenType]); // 필터 변경 시 재요청

  const loadMore = useCallback(() => {
    console.log(
      'loadMore 호출, 현재 페이지:' +
        currentPage +
        ', 최대 페이지:' +
        totalPages +
        ', isFetching:' +
        isFetching,
    );

    // 페이지가 마지막 페이지에 도달하지 않고, isFetching이 false일 때만 페이지 증가
    if (currentPage < totalPages && !isFetching) {
      setCurrentPage(prev => prev + 1); // 페이지 증가
    }
  }, [currentPage, totalPages, isFetching]);

  return (
    <div className="board-page">
      {/* 상단 로고 및 검색창 */}
      <div className="board-header">
        <img src={Logo} alt="Logo" className="logo-image" />
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="키워드로 게시글을 검색해주세요!"
          />
        </div>
      </div>

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
