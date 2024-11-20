// XModal.js
import React from 'react';
import '../../styles/components/common/XModal.css';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

const XModal = ({message, onClose}) => {
  // 에러 메시지 전역 상태
  const setXmodalState = useSetRecoilState(xModalAtom);

  const onClick = () => {
    setXmodalState({isOpened: false});
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClick}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default XModal;
