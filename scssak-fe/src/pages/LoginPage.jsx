import LoginForm from '../components/login/LoginForm';

import {loginImg, backgroundSeaImg} from '../assets/images/index';
import styles from '../styles/pages/LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <img
        className={styles.imgBackground}
        src={backgroundSeaImg}
        alt="로그인 배경 일러스트"
      />

      <div className={styles.containerIntroduce}>
        <p className={styles.textBlue}>슥사 새싹들의 커뮤니티,</p>
        <p className={styles.textBlue}>슥싹</p>

        <img
          className={styles.imgLogin}
          src={loginImg}
          alt="로그인 메인 일러스트"
        />

        <p className={styles.textGray}>커뮤니티 하나로</p>
        <p className={styles.textGray}>출석부터 꿀팁 공유까지 한 번에!</p>

        <p className={styles.textBlack}>슥사로의 여정, 시작해볼까요?</p>
      </div>

      <LoginForm />

      <p className={styles.textCopyright}>All rights reseverd. ⓒ 슥싹</p>
    </main>
  );
}
