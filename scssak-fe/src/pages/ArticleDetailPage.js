import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'; // URL 파라미터를 사용하기 위함
import Navbar from './Navbar'; // 하단 네비게이션 컴포넌트
import './PostDetailPage.css';

const ArticleDetailPage = () => {
  const {articleId} = useParams(); // URL에서 articleId 추출
  const [article, setArticle] = useState(null); // 게시글 정보
  const [error, setError] = useState(null); // 오류 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API에서 게시글 정보 가져오기
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        if (!response.ok) {
          if (response.status === 404)
            throw new Error('404: 게시글을 찾을 수 없습니다.');
          if (response.status === 401) throw new Error('401: 로그인 해주세요.');
          if (response.status === 500)
            throw new Error('500: 서버에 문제가 발생했습니다.');
        }
        const data = await response.json();
        setArticle(data); // 게시글 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchArticle();
  }, [articleId]);

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-detail-page">
      <header className="header">
        <div className="back-button">
          <span>&lt; 자유 게시판</span>
        </div>
      </header>
      {article && (
        <div className="post-container">
          <h2 className="post-title">{article.article_title}</h2>
          <div className="post-info">
            <span>{article.article_user_name}</span>
            <span className="post-date">
              {article.article_created_at} | 조회수 {article.view_count}
            </span>
          </div>

          <div className="post-images">
            {article.article_image_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`게시글 이미지 ${index + 1}`}
                className="post-image"
              />
            ))}
          </div>

          <div className="post-content">
            <p>{article.article_content}</p>
          </div>

          <div className="likes-comments">
            <button className="like-button">
              {article.article_is_liked ? '❤️' : '🤍'}{' '}
              {article.article_like_count}
            </button>
            <div className="comments-count">{article.comments.length} 댓글</div>
          </div>

          <hr className="divider" />

          <div className="comments-section">
            {article.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-user">{comment.comment_user_name}</div>
                <div className="comment-date">{comment.comment_created_at}</div>
                <div className="comment-content">{comment.comment_content}</div>
              </div>
            ))}
          </div>

          <div className="comment-input-section">
            <input type="text" placeholder="댓글을 입력해주세요." />
            <button>댓글 등록</button>
          </div>
        </div>
      )}
      <Navbar /> {/* 하단 네비게이션 바 컴포넌트 */}
    </div>
  );
};

export default ArticleDetailPage;
