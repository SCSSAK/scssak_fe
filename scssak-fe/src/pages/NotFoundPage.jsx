import {backgroundImg404} from '../assets/images/index';

import styles from '../styles/pages/NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <img
        className={styles.imgBackground}
        src={backgroundImg404}
        alt="페이지를 찾지 못함"
      />
    </div>
  );
}
