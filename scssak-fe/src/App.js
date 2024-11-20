import {useRecoilValue} from 'recoil';
import {xModalAtom, confirmModalAtom} from './recoil/atom';

import XModal from './components/common/XModal';
import ConfirmModal from './components/common/ConfirmModal';

import AppRouter from './router/AppRouter';

import './App.css';

function App() {
  const xModalState = useRecoilValue(xModalAtom);
  const confirmModalState = useRecoilValue(confirmModalAtom);

  return (
    <div
      className="App"
      // 우클릭 방지
      onContextMenu={e => {
        e.preventDefault();
      }}>
      <AppRouter />

      {/* XModal */}
      {xModalState.isOpened && <XModal />}

      {/* ConfirmModal */}
      {confirmModalState.isOpened && <ConfirmModal />}
    </div>
  );
}

export default App;
