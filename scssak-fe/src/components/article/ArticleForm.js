import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/components/article/ArticleForm.css';
import go_back_arrow from '../../assets/images/go_back_arrow.png';
import dropdown_arrow_down from '../../assets/images/dropdown_arrow_down.png';
import dropdown_arrow_up from '../../assets/images/dropdown_arrow_up.png';
import picture_button from '../../assets/images/picture_button.png';

import {useSetRecoilState} from 'recoil';
import {confirmModalAtom} from '../../recoil/atom';

const ArticleForm = ({isEditMode, onSubmit, initialData}) => {
  let initialBoard = '';
  let initialVisibility = '전체';
  let initialTitle = '';
  let initialContent = '';
  let showImageUpload = true; // 이미지 업로드 버튼을 보여줄지 여부

  const navigate = useNavigate(); // useNavigate 훅 선언

  const handleGoBack = () => {
    navigate(-1); // 히스토리 스택에서 이전 페이지로 이동
  };

  if (initialData) {
    isEditMode = true;
    initialBoard = initialData.board;
    initialVisibility = initialData.visibility;
    initialTitle = initialData.article_title;
    initialContent = initialData.article_content;
    showImageUpload = false;
  }

  const [selectedBoard, setSelectedBoard] = useState(initialBoard);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedImages, setSelectedImages] = useState([]); // 여러 이미지 첨부용

  const boards = [
    '자유 게시판',
    '꿀팁 게시판',
    '질문 게시판',
    '칭찬 게시판',
    '자랑해요 게시판',
  ];
  const boardRef = useRef(null);

  const handleBoardSelect = board => {
    setSelectedBoard(board);
    setIsDropdownOpen(false);
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files); // 선택한 파일 목록을 배열로 변환
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file), // 미리보기용 URL
      file: file, // 실제 파일 데이터
    }));
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleImageDelete = index => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // 모달 전역 상태
  const setConfirmModalState = useSetRecoilState(confirmModalAtom);

  const handleSubmit = () => {
    // 모달을 열고 확인을 통해 부모의 onSubmit 함수 호출
    setConfirmModalState({
      isOpened: true,
      message: isEditMode
        ? '게시글을 수정하시겠습니까?'
        : '게시글을 등록하시겠습니까?',
      onConfirm: handleConfirm,
    });
  };

  const handleConfirm = async () => {
    // if (!title || !)
    // 작성 모드
    if (!isEditMode) {
      const formData = new FormData();

      // FormData에 백엔드에서 요구하는 파라미터 이름으로 데이터 추가
      formData.append('article_title', title); // 변경
      formData.append('article_content', content); // 변경
      formData.append('article_type', boards.indexOf(selectedBoard) + 1);
      formData.append('article_is_open', visibility === '전체'); // 변경

      // 이미지 파일 추가
      selectedImages.forEach(image => {
        formData.append('images', image.file);
      });

      // 부모 컴포넌트에서 받은 onSubmit 함수를 호출하고, 필요한 데이터를 전달합니다.
      if (onSubmit) {
        onSubmit(formData); // 부모의 onSubmit에 formData 전달
      }
    } else {
      // 수정 모드
      const requestData = {
        article_title: title, // 제목
        article_content: content, // 내용
        article_type: boards.indexOf(selectedBoard) + 1, // 게시판 선택
        article_is_open: visibility === '전체', // 공개 범위 (전체: true, 동기: false)
      };

      // 부모 컴포넌트에서 받은 onSubmit 함수를 호출하고, 필요한 데이터를 전달합니다.
      if (onSubmit) {
        console.log(requestData);
        onSubmit(requestData); // 부모의 onSubmit에 requestData 전달
      }
    }
  };

  return (
    <div className="article-write-page">
      <header className="header">
        <div className="form-group back-button-group">
          <button className="back-button" onClick={handleGoBack}>
            <img src={go_back_arrow} alt="<-"></img>
          </button>
          <div>{isEditMode ? '게시글 수정' : '글쓰기'}</div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          {isEditMode ? '수정' : '등록'}
        </button>
      </header>

      <div className="form">
        {/* 게시판 선택 */}
        <div className="form-group select-board-group">
          <div
            className="select-board"
            ref={boardRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedBoard || '게시판을 선택하세요'}
            {!isDropdownOpen && (
              <img
                src={dropdown_arrow_down}
                alt="▼"
                className="dropdown-arrow-image"></img>
            )}
            {isDropdownOpen && (
              <img
                src={dropdown_arrow_up}
                alt="▲"
                className="dropdown-arrow-image"></img>
            )}
          </div>
          {isDropdownOpen && (
            <div
              className="dropdown-menu"
              style={{width: boardRef.current?.offsetWidth}}>
              {boards.map((board, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleBoardSelect(board)}>
                  {board}
                </div>
              ))}
            </div>
          )}
        </div>
        <hr /> {/* 구분선 */}
        {/* 공개 범위 선택 */}
        <div className="form-group visibility-group">
          <label className="visibility-label">공개범위</label>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                value="전체"
                checked={visibility === '전체'}
                onChange={() => setVisibility('전체')}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                value="동기"
                checked={visibility === '동기'}
                onChange={() => setVisibility('동기')}
              />
              동기
            </label>
          </div>
        </div>
        <hr /> {/* 구분선 */}
        {/* 제목 입력 */}
        <div className="form-group title-group">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <hr /> {/* 구분선 */}
        {/* 내용 입력 */}
        <div className="form-group text-group">
          <textarea
            placeholder="내용을 입력하세요. 1,000자 이내로 작성 가능합니다."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        {/* 이미지 업로드 */}
        {showImageUpload && (
          <div className="form-group picture-group">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              multiple
              style={{display: 'none'}}
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload" className="photo-add-button">
              <img src={picture_button} alt="사진 추가하기" />
            </label>
            <div className="image-preview-container">
              {selectedImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={image.url}
                    alt={`selected-${index}`}
                    className="preview-image"
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="image-delete-button">
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <hr /> {/* 구분선 */}
      </div>
    </div>
  );
};

export default ArticleForm;
