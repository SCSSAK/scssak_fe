import {useRecoilValue} from 'recoil';
import {xModalAtom} from './recoil/atom';

import XModal from './components/common/XModal';

import AppRouter from './router/AppRouter';

import './App.css';

function App() {
  const xModalState = useRecoilValue(xModalAtom);

  return (
    <div
      className="App"
      onContextMenu={e => {
        e.preventDefault();
      }}>
      <AppRouter />

      {/* 에러 메시지 */}
      {xModalState.isOpened && (
        <XModal message={xModalState.message} onClose={xModalState.onClose} />
      )}
    </div>
  );
}

export default App;
