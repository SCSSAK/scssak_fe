import {useLocation, useNavigate} from 'react-router-dom';

import ProfileForm from '../components/profileEdit/ProfileForm';
import go_back_arrow from '../assets/images/go_back_arrow.png';

import styles from '../styles/pages/ProfileEditPage.module.css';

export default function ProfileEditPage() {
  const location = useLocation();
  const data = location.state?.data;

  // page 이동
  const navigate = useNavigate();

  const handleClickMoveToProfileButton = () => {
    navigate(-1);
  };

  return (
    <main className={styles.container}>
      <div className={styles.containerTitle}>
        <img
          className={styles.iconGoBackArrow}
          src={go_back_arrow}
          alt="뒤로 가기 버튼"
          onClick={handleClickMoveToProfileButton}
        />
        기본 정보 수정
      </div>

      <ProfileForm data={data} />
    </main>
  );
}
