import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

import ProfileForm from '../components/profileEdit/ProfileForm';
import ConfirmModal from '../components/common/ConfirmModal';
import {BASE_URL} from '../router/Routes';
import go_back_arrow from '../assets/images/go_back_arrow.png';

import styles from '../styles/pages/ProfilePage.module.css';

export default function ProfileEditPage() {
  const location = useLocation();
  const data = location.state?.data;

  // page 이동
  const navigate = useNavigate();

  const handleClickMoveToProfileButton = () => {
    navigate(-1);
  };

  // 확인 모달이 띄워져있는가?
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleConfirm = () => {
    // axios
    //   .create({
    //     baseURL: BASE_URL,
    //   })
    //   .get(`/user/logout`)
    //   .then(r => {
    //     console.log(r);
    //     navigate(loginRoute);
    //   })
    //   .catch(e => console.log(e));
  };

  const handleCancel = () => {
    setIsModalOpened(false);
  };

  return (
    <main className={styles.container}>
      <div className={styles.containerTitle}>
        <p className={styles.textTitle}>기본 정보 수정</p>
        <img
          src={go_back_arrow}
          alt="뒤로 가기 버튼"
          onClick={handleClickMoveToProfileButton}
        />
      </div>

      <ProfileForm data={data} />

      {isModalOpened && (
        <ConfirmModal
          message="변경하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
