import React from 'react';
import '../../styles/components/common/ConfirmModal.css';
import {useRecoilState} from 'recoil';
import {confirmModalAtom} from '../../recoil/atom';

const ConfirmModal = () => {
  const [confirmModalState, setConfirmModalState] =
    useRecoilState(confirmModalAtom);

  const onConfirm = e => {
    e.stopPropagation();
    setConfirmModalState({isOpened: false});
    if (confirmModalState.onConfirm) {
      confirmModalState.onConfirm();
    }
  };

  const onCancel = e => {
    e.stopPropagation();
    setConfirmModalState({isOpened: false});
    if (confirmModalState.onCancel) {
      confirmModalState.onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={e => onCancel(e)}>
      <div className="modal-content">
        <p>{confirmModalState.message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={e => onCancel(e)}>
            취소
          </button>
          <button className="modal-button confirm" onClick={e => onConfirm(e)}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
