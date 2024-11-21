import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom, confirmModalAtom} from '../recoil/atom';

import Profile from '../components/profile/Profile';
import ProfileArticleList from '../components/profile/ProfileArticleList';

import {API_AUTH} from '../apis/apiSettings';
import {PROFILE_URL, LOGOUT_URL} from '../apis/apiUrls';

import {loginRoute, profileEditRoute} from '../router/Routes';

import go_back_arrow from '../assets/images/go_back_arrow.png';
import {iconMenu, iconSetting} from '../assets/images';
import styles from '../styles/pages/ProfilePage.module.css';

export default function ProfilePage() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const {user_id} = useParams();
  const loginedUserId = localStorage.getItem('userId');

  // 현재 로그인한 사용자의 user_id와 path variable로 받은 user_id가 동일한가?
  const isUserIdSame = user_id === loginedUserId;

  // 표시할 데이터
  const [profileData, setProfileData] = useState({
    user_name: '',
    user_semester: 0,
    user_company: '',
    user_department: '',
    user_position: '',
    user_email: '',
    user_sns: '',
    user_message: '',
    user_img: '',
  });

  // profile api 호출
  useEffect(() => {
    API_AUTH.get(PROFILE_URL + '/' + user_id)
      .then(r => {
        setProfileData(r.data);
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: () => navigate(loginRoute),
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalState({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      });
  }, []);

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

  const handleClickMoveToProfileEditButton = () => {
    navigate(profileEditRoute, {
      state: {data: profileData},
    });
  };

  // 모달 전역 상태
  const setConfirmModalState = useSetRecoilState(confirmModalAtom);

  const handleClickLogoutButton = () => {
    setConfirmModalState({
      isOpened: true,
      message: '로그아웃 하시겠습니까?',
      onConfirm: handleConfirmLogout,
    });
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
        setXModalState({
          isOpened: true,
          message: '서버와 통신 중 오류가 발생했습니다.',
        });
      });
  };

  const handleClickGoBackButton = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container} onClick={handleClickProfilePage}>
      <main>
        <div className={styles.containerTitle}>
          {!isUserIdSame && (
            <img
              className={styles.iconGoBackArrow}
              src={go_back_arrow}
              alt="뒤로 가기 버튼"
              onClick={handleClickGoBackButton}
            />
          )}

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
        <ProfileArticleList userId={user_id} />
      </main>
    </div>
  );
}
