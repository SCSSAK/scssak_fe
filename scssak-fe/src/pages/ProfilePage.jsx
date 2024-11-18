import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import Profile from '../components/profile/Profile';
import ProfileArticleList from '../components/profile/ProfileArticleList';
import ConfirmModal from '../components/common/ConfirmModal';
import XModal from '../components/common/XModal';
import Navbar from '../components/common/Navbar';

import {API_AUTH} from '../apis/apiSettings';
import {PROFILE_URL, LOGOUT_URL} from '../apis/apiUrls';

import {loginRoute, profileEditRoute} from '../router/Routes';

import {iconMenu, iconSetting} from '../assets/images';
import styles from '../styles/pages/ProfilePage.module.css';

export default function ProfilePage() {
  const {user_id} = useParams();
  const loginedUserId = localStorage.getItem('userId');

  // 현재 로그인한 사용자의 user_id와 path variable로 받은 user_id가 동일한가?
  const isUserIdSame = user_id === loginedUserId;

  const [profileData, setProfileData] = useState({
    user_name: '김동규',
    user_semester: 13,
    user_company: 'SK하이닉스',
    user_department: 'Solution SW',
    user_position: '부장',
    user_email: 'scsa23000@scsa.com',
    user_sns: '@boneismylif',
    user_message:
      '안녕하세요, 13기 김동규입니다.\n SK 하이닉스 이직 관련 고민은 제게 문의 주시면 됩니다.\n 쓱싸 전체 회식 하고 싶어요.\n 동기님, 후배님들은 밥 사드려요~~!',
    user_img:
      'https://static.wanted.co.kr/community/2022/5/0e62e732238a73f1a2834638909bd6b216b4d40b135403b508947076cefe1c89_resized',
  });

  useEffect(() => {
    API_AUTH.get(PROFILE_URL + '/' + user_id)
      .then(r => {
        setProfileData(r.data);
      })
      .catch(e => {
        // 에러 처리 (예: 네트워크 문제 또는 서버 에러)
        setXModalInfo({
          isOpened: true,
          message: '서버와 통신 중 오류가 발생했습니다.',
        });
      });
  });

  // 메뉴 창이 띄워져있는가?
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleClickMenuButton = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleClickProfilePage = () => {
    if (isMenuOpened) {
      setIsMenuOpened(!isMenuOpened);
    }
  };

  // page 이동
  const navigate = useNavigate();

  const handleClickMoveToProfileEditButton = () => {
    navigate(profileEditRoute, {
      state: {data: profileData},
    });
  };

  // 확인 모달이 띄워져있는가?
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClickLogoutButton = () => {
    setIsModalOpened(!isModalOpened);
  };

  const handleConfirmLogout = () => {
    API_AUTH.post(LOGOUT_URL)
      .then(r => {
        // 로그아웃 처리
        localStorage.clear();
        navigate(loginRoute);
      })
      .catch(e => {
        // 에러 처리 (예: 네트워크 문제 또는 서버 에러)
        setXModalInfo({
          isOpened: true,
          message: '서버와 통신 중 오류가 발생했습니다.',
        });
      });
  };

  const handleCancelLogout = () => {
    setIsModalOpened(false);
  };

  // 에러 메시지 표시용 모달
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
  });

  const handleCloseXModal = () => {
    setXModalInfo({isOpened: false});
  };

  return (
    <div className={styles.container} onClick={handleClickProfilePage}>
      <main>
        <div className={styles.containerTitle}>
          <p className={styles.textTitle}>프로필</p>
          {isUserIdSame && (
            <div className={styles.containerTitleIcon}>
              <img
                className={styles.iconMenu}
                src={iconMenu}
                alt="메뉴 아이콘"
                onClick={handleClickMenuButton}
              />
            </div>
          )}
          {isMenuOpened && (
            <div className={styles.containerMenu}>
              <div className={styles.containerMenuTitle}>
                <img
                  className={styles.containerMenuIcon}
                  src={iconSetting}
                  alt="개인 설정 아이콘"
                />
                <span>개인 설정</span>
              </div>
              <div
                className={styles.containerMenuItem}
                onClick={handleClickMoveToProfileEditButton}>
                개인정보 수정
              </div>
              <div
                className={styles.containerMenuItem}
                onClick={handleClickLogoutButton}>
                로그아웃
              </div>
            </div>
          )}
        </div>

        <Profile data={profileData} />
        <ProfileArticleList />
      </main>

      {isModalOpened && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}

      <Navbar />

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={handleCloseXModal} />
      )}
    </div>
  );
}
