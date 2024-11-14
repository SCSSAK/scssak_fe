import React, {useState, useRef} from 'react';
import '../../styles/components/article/ArticleForm.css';
import ConfirmModal from '../common/ConfirmModal';
import go_back_arrow from '../../assets/images/go_back_arrow.png';
import dropdown_arrow_down from '../../assets/images/dropdown_arrow_down.png';
import dropdown_arrow_up from '../../assets/images/dropdown_arrow_up.png';
import picture_button from '../../assets/images/picture_button.png';

const ArticleForm = ({
  isEditMode = false, // 작성/수정 모드 구분
  initialBoard = '',
  initialVisibility = '전체',
  initialTitle = '',
  initialContent = '',
  onSubmit, // 등록/수정 버튼 클릭 시 처리할 함수
  showImageUpload = true, // 이미지 업로드 버튼을 보여줄지 여부
}) => {
  const [selectedBoard, setSelectedBoard] = useState(initialBoard);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedImages, setSelectedImages] = useState([]); // 여러 이미지 첨부용
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleImageDelete = index => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({
      selectedBoard,
      visibility,
      title,
      content,
      images: selectedImages, // 여러 이미지 전송
    });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onSubmit({
      selectedBoard,
      visibility,
      title,
      content,
      images: selectedImages,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="article-write-page">
      <header className="header">
        <div className="form-group back-button-group">
          <button className="back-button">
            <img src={go_back_arrow} alt="<-"></img>
          </button>
          <div>{isEditMode ? '게시글 수정' : '글쓰기'}</div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          {isEditMode ? '수정' : '등록'}
        </button>
        {isModalOpen && (
          <ConfirmModal
            message={
              isEditMode
                ? '게시글을 수정하시겠습니까?'
                : '게시글을 등록하시겠습니까?'
            }
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
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
                    src={image}
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
