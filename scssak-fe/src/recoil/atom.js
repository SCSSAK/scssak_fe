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
  default: {
    searchKeyword: '', // 검색어 상태 관리
    searchKeywordLockIn: '', // 검색어 검색 버튼 눌렀을때 확정
  },
});
