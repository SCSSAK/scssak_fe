import {atom} from 'recoil';

// xModal 전역 상태
export const xModalAtom = atom({
  key: 'xModalAtom',
  default: {
    isOpened: false,
    message: '',
    onClose: () => {},
  },
});

// confirmModal 전역 상태
export const confirmModalAtom = atom({
  key: 'confirmModalAtom',
  default: {
    isOpened: false,
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  },
});

// searchBar 전역 상태
export const searchBarAtom = atom({
  key: 'searchBarAtom',
  default: {},
});
