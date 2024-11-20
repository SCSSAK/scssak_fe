import {useRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import '../../styles/components/common/XModal.css';

const XModal = () => {
  const [xModalState, setXModalState] = useRecoilState(xModalAtom);

  const onClick = e => {
    e.stopPropagation();
    setXModalState({isOpened: false});
    if (xModalState.onClose) {
      xModalState.onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={e => onClick(e)}>
      <div className="modal-content">
        <span className="close-btn" onClick={e => onClick(e)}>
          &times;
        </span>
        <p>{xModalState.message}</p>
      </div>
    </div>
  );
};

export default XModal;
