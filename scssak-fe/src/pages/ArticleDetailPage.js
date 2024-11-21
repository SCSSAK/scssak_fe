import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {BASE_URL} from '../router/Routes';
import '../styles/pages/ArticleDetailPage.css';
import go_back_arrow from '../assets/images/go_back_arrow.png';
import heart_active from '../assets/images/article/heart_active.png';
import like_button from '../assets/images/article/like_button.png'; // 좋아요 버튼
import like_button_activated from '../assets/images/article/like_button_activated.png'; // 좋아요 버튼(꽉 찬 하트)
import edit_button from '../assets/images/article/edit_button.png'; // 수정 버튼
import delete_button from '../assets/images/article/delete_button.png'; // 삭제 버튼
import comment_icon from '../assets/images/article/comment_icon.png'; // 댓글 아이콘
import comment_submit_icon from '../assets/images/article/comment_submit_icon.png'; // 댓글 등록 아이콘
import comment_delete_icon from '../assets/images/article/comment_delete_icon.png'; // 댓글 삭제 아이콘
import default_image from '../assets/images/default_thumbnail.png'; // 디폴트 이미지

import {useSetRecoilState} from 'recoil';
import {confirmModalAtom} from '../recoil/atom';

const ArticleDetailPage = () => {
  const {articleId} = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // 사용자 ID
  const [commentContent, setCommentContent] = useState(''); // 댓글 내용
  const [selectedCommentId, setSelectedCommentId] = useState(null); // 삭제할 댓글 ID 추적

  const navigate = useNavigate(); // useNavigate 훅 선언

  const boardType = ['??', '자유', '꿀팁', '질문', '칭찬', '자랑'];

  const handleGoBack = () => {
    navigate(-1); // 히스토리 스택에서 이전 페이지로 이동
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const auth = `Bearer ${localStorage.getItem('access_token')}`;
        const url = BASE_URL + `/article/${articleId}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          console.log(data);
          setIsLiked(data.article_is_liked); // 기존 좋아요 상태 가져오기
        } else {
          if (response.status === 404) {
            setError('해당 게시글이 존재하지 않습니다.');
          } else if (response.status === 401) {
            setError('로그인이 필요합니다.');
          } else {
            setError('서버에 문제가 발생했습니다.');
          }
        }
      } catch (err) {
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    setArticle({
      ...article,
      article_is_liked: !isLiked,
      article_like_count: isLiked
        ? article.article_like_count - 1
        : article.article_like_count + 1,
    });

    try {
      const auth = `Bearer ${localStorage.getItem('access_token')}`;
      const url = BASE_URL + `/like/${articleId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      });

      if (!response.ok) {
        console.error('좋아요 요청 실패');
      }
    } catch (err) {
      console.error('네트워크 오류 발생:', err);
    }
  };

  // 모달 전역 상태
  const setConfirmModalState = useSetRecoilState(confirmModalAtom);

  const handleCommentSubmit = () => {
    setConfirmModalState({
      isOpened: true,
      message: '댓글을 등록하시겠습니까?',
      onConfirm: handleConfirmCommentSubmit,
    });
  };

  const handleConfirmCommentSubmit = async () => {
    try {
      const auth = `Bearer ${localStorage.getItem('access_token')}`;
      const url = BASE_URL + `/comment/${articleId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify({
          comment_content: commentContent,
        }),
      });

      if (!response.ok) {
        console.error('댓글 등록 실패');
      } else {
        // 댓글 등록 성공 시 새로고침
        window.location.reload();
      }
    } catch (err) {
      console.error('네트워크 오류 발생:', err);
    }
  };

  const handleEditClick = () => {
    // state를 사용하여 데이터를 전달
    navigate(`/board/edit/${articleId}`, {
      state: {article, articleId},
    });
  };

  const handleArticleDelete = () => {
    setConfirmModalState({
      isOpened: true,
      message: '게시글을 삭제하시겠습니까?',
      onConfirm: handleConfirmArticleDelete,
    });
  };

  const handleConfirmArticleDelete = async () => {
    try {
      const auth = `Bearer ${localStorage.getItem('access_token')}`;
      const url = BASE_URL + `/article/${articleId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      });

      if (response.ok) {
        // 삭제 성공 시, 게시판 목록 페이지로 이동
        navigate('/board');
      } else {
        console.error('삭제 요청 실패');
      }
    } catch (err) {
      console.error('네트워크 오류 발생:', err);
    }
  };

  const handleCommentDelete = commentId => {
    setConfirmModalState({
      isOpened: true,
      message: '댓글을 삭제하시겠습니까?',
      onConfirm: () => handleConfirmCommentDelete(commentId),
    });
  };

  const handleConfirmCommentDelete = async commentId => {
    try {
      const auth = `Bearer ${localStorage.getItem('access_token')}`;
      const url = BASE_URL + `/comment/${articleId}/${commentId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      });

      if (response.ok) {
        // 삭제 성공 시 새로고침
        window.location.reload();
      } else {
        console.error('삭제 요청 실패');
      }
    } catch (err) {
      console.error('네트워크 오류 발생:', err);
    }
  };

  const handleUserClick = userId => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>게시글 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="article-detail-page">
      <header className="header">
        <div className="header-left">
          <div className="back-button" onClick={handleGoBack}>
            <img src={go_back_arrow} alt="<-" />
          </div>
          <div className="board-title">
            {boardType[article.article_type]} 게시판
          </div>
        </div>
      </header>

      {article && (
        <div className="article-content-container">
          <h2 className="article-title">{article.article_title}</h2>
          <div className="edit-delete-container">
            {article.article_user_id === userId && (
              <div className="edit-delete-buttons">
                <img
                  className="edit-button"
                  src={edit_button}
                  alt="수정"
                  onClick={handleEditClick}
                />
                <img
                  className="delete-button"
                  src={delete_button}
                  alt="삭제"
                  onClick={handleArticleDelete}
                />
              </div>
            )}
          </div>

          <hr className="divider" />

          <div className="article-info">
            <span
              className="writer-name"
              onClick={() => handleUserClick(article.article_user_id)}>
              {article.article_user_name}
            </span>
            <span>{article.article_created_at.split('T')[0]}</span>
          </div>

          <hr className="divider" />

          <div className="article-images">
            {article.article_image_urls.length > 0 ? (
              article.article_image_urls.map((url, index) => (
                <img key={index} src={url} alt="첨부 이미지" />
              ))
            ) : (
              <img
                src={default_image}
                alt="기본 이미지"
                className="default-image"
              />
            )}
          </div>

          <hr className="divider" />

          <div className="article-content">
            <p>{article.article_content}</p>
          </div>

          <hr className="divider" />

          <div className="likes-comments">
            <div className="likes-comments-left-container">
              <div className="likes-left">
                <img
                  className={`like-heart ${isLiked ? 'liked' : 'unliked'}`}
                  src={heart_active}
                  alt="좋아요"
                />
                <span className="like-count">{article.article_like_count}</span>
              </div>
              <div className="comments-count">
                <img src={comment_icon} alt="댓글" />
                <span>{article.comments.length}</span>
              </div>
            </div>
            <div className="like-button">
              <img
                src={isLiked ? like_button_activated : like_button}
                alt="좋아요 버튼"
                className="like-button-img"
                onClick={handleLikeClick}
              />
            </div>
          </div>

          <hr className="divider" />

          <div className="comments-section">
            {article.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-upper-container">
                  <div className="comment-content">
                    {comment.comment_content}
                  </div>
                  <div
                    className={`${comment.comment_user_id === userId ? 'show-delete-button' : ''}`}>
                    <img
                      src={comment_delete_icon}
                      alt="X"
                      className="delete-button"
                      onClick={() =>
                        handleCommentDelete(comment.comment_id)
                      }></img>
                  </div>
                </div>
                <div className="comment-info">
                  <div
                    className="comment-user"
                    onClick={() => handleUserClick(comment.comment_user_id)}>
                    {comment.comment_user_name}
                  </div>
                  <div className="comment-date">
                    {new Date(comment.comment_created_at).toLocaleDateString()}
                    {/* 날짜만 표시 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 댓글 입력 섹션 고정 */}
      <div className="comment-input-section">
        <textarea
          placeholder="댓글을 입력해주세요."
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)} // 댓글 내용 업데이트
        />
        <button onClick={handleCommentSubmit}>
          <img src={comment_submit_icon} alt="댓글 등록" />
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
