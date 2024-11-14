import React, {useState} from 'react';
import '../styles/pages/ArticleBoardPage.css';
import ArticleList from '../components/article/ArticleList';
import Logo from '../assets/images/logo.png';
// import noticeIcon from '../assets/images/notice-icon.png';

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
  const [activeType, setActiveType] = useState('typeAll');
  const [activeOpenType, setActiveOpenType] = useState('전체');

  const handleTypeClick = type => {
    setActiveType(type);

    // API 요청 예시 (type을 요청에 포함)
    fetch(`/api/articles?type=${type}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched articles:', data);
        // 여기서 data를 상태에 저장하거나 ArticleList에 전달하는 로직 추가 가능
      })
      .catch(error => console.error('Error fetching articles:', error));
  };

  const handleOpenTypeClick = openType => {
    setActiveOpenType(openType);

    // API 요청 예시 (openType을 요청에 포함)
    fetch(`/api/articles?openType=${openType}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched articles with openType:', data);
        // 여기서 data를 상태에 저장하거나 ArticleList에 전달하는 로직 추가 가능
      })
      .catch(error => console.error('Error fetching articles:', error));
  };

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
          onClick={() => handleTypeClick('typeAll')}
        />
        <img
          src={activeType === 'type1' ? type1Active : type1InActive}
          alt="자유"
          className={`type-button ${activeType === 'type1' ? 'active' : ''}`}
          onClick={() => handleTypeClick('type1')}
        />
        <img
          src={activeType === 'type2' ? type2Active : type2InActive}
          alt="꿀팁"
          className={`type-button ${activeType === 'type2' ? 'active' : ''}`}
          onClick={() => handleTypeClick('type2')}
        />
        <img
          src={activeType === 'type3' ? type3Active : type3InActive}
          alt="질문"
          className={`type-button ${activeType === 'type3' ? 'active' : ''}`}
          onClick={() => handleTypeClick('type3')}
        />
        <img
          src={activeType === 'type4' ? type4Active : type4InActive}
          alt="칭찬"
          className={`type-button ${activeType === 'type4' ? 'active' : ''}`}
          onClick={() => handleTypeClick('type4')}
        />
        <img
          src={activeType === 'type5' ? type5Active : type5InActive}
          alt="자랑해요"
          className={`type-button ${activeType === 'type5' ? 'active' : ''}`}
          onClick={() => handleTypeClick('type5')}
        />
      </div>

      {/* 게시글 공개 범위 선택 */}
      <div className="open-type">
        <span
          className={`open-type-item ${activeOpenType === '전체' ? 'active' : ''}`}
          onClick={() => handleOpenTypeClick('전체')}>
          전체
        </span>
        {' | '}
        <span
          className={`open-type-item ${activeOpenType === '동기' ? 'active' : ''}`}
          onClick={() => handleOpenTypeClick('동기')}>
          동기
        </span>
      </div>

      {/* 공지 바 */}
      <div className="notice-bar">
        <span className="notice-icon">공지</span>
        <span>욕설이나 비방글은 자동 삭제됩니다.</span>
      </div>

      {/* 게시글 목록 */}
      <ArticleList />

      {/* 하단 글쓰기 버튼 */}
      <button className="write-button">글쓰기</button>
    </div>
  );
};

export default ArticleBoardPage;
