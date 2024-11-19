import {useParams, useLocation, useNavigate} from 'react-router-dom';

import MailWriteForm from '../components/mailWrite/MailWriteForm';
import go_back_arrow from '../assets/images/go_back_arrow.png';
import {backgroundImgSea} from '../assets/images/index';

import styles from '../styles/pages/MailWritePage.module.css';

export default function MailWritePage() {
  const location = useLocation();
  const receiver_name = location.state?.receiver_name;
  const {receiver_id} = useParams();

  // page 이동
  const navigate = useNavigate();

  const handleClickGoBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className={styles.container}
      style={{backgroundImage: `url(${backgroundImgSea})`}}>
      <header className={styles.containerTitle}>
        <img
          className={styles.iconGoBackArrow}
          src={go_back_arrow}
          alt="뒤로 가기 버튼"
          onClick={handleClickGoBackButton}
        />
        <span>글쓰기</span>
      </header>

      <main>
        <p className={styles.textReceiverTitle}>
          To. {receiver_name}님께 보내는 편지💙
        </p>

        <p className={styles.textAlert}>
          ! 비방 및 욕설이 포함될 경우, 경고 없이 삭제될 수 있습니다.
        </p>

        <MailWriteForm receiver_id={receiver_id} />
      </main>
    </div>
  );
}
