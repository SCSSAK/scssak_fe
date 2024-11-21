import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {searchBarAtom} from '../../recoil/atom';

import {mainRoute} from '../../router/Routes';

import {imgLogo, iconSearch} from '../../assets/images';

import styles from '../../styles/components/common/Header.module.css';

export default function Header({hasSearchBar}) {
  const navigate = useNavigate();

  // 검색바 전역 상태
  const [searchBarState, setSearchBarState] = useRecoilState(searchBarAtom);

  const handleInputChange = e => {
    setSearchBarState({
      searchKeyword: e.target.value,
    });
  };

  const handleClickSearchButton = () => {
    setSearchBarState({
      searchKeywordLockIn: searchBarState.searchKeyword,
    });
  };

  return (
    <header className={styles.container}>
      <img src={imgLogo} alt="슥싹 로고" onClick={() => navigate(mainRoute)} />

      {hasSearchBar && (
        <div className={styles.containerSearch}>
          <input
            type="text"
            className={styles.inputSearch}
            placeholder="키워드로 게시글을 검색해주세요!"
            maxLength={15} // 입력 길이 제한 추가
            onChange={handleInputChange} // 검색어 입력 이벤트 처리
          />
          <img
            className={styles.imgSearch}
            src={iconSearch}
            alt="검색 아이콘"
            onClick={handleClickSearchButton}
          />
        </div>
      )}
    </header>
  );
}
