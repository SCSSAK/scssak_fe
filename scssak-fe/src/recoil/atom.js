import {atom} from 'recoil';

// 에러 메시지 전역 상태
export const xModalAtom = atom({
  key: 'xModalAtom',
  default: {
    isOpened: false,
    message: '',
    onClose: () => {},
  },
});
