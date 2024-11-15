import {imgLogo} from '../../assets/images';

import styles from '../../styles/components/common/Header.module.css';

export default function Header({hasSearchBar, setKeyword}) {
  return (
    <header className={styles.container}>
      <img src={imgLogo} alt="슥싹 로고" />

      {hasSearchBar && (
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="키워드로 게시글을 검색해주세요!"
          />
        </div>
      )}
    </header>
  );
}
