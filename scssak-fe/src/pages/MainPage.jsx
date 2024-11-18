import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import AttendanceButton from '../components/main/AttendanceButton';
import TardyList from '../components/main/TardyList';
import NoticeList from '../components/main/NoticeList';
import Navbar from '../components/common/Navbar';
import XModal from '../components/common/XModal';

import {API_AUTH} from '../apis/apiSettings';
import {MAIN_URL} from '../apis/apiUrls';

import {loginRoute} from '../router/Routes';

import {imgLogo} from '../assets/images';
import styles from '../styles/pages/MainPage.module.css';

export default function MainPage() {
  // page 이동
  const navigate = useNavigate();

  const [data, setData] = useState({
    user_tardy_count: 0,
    tardy_penalty: 0,
    absent_list: [],
    notice_list: [],
  });

  useEffect(() => {
    API_AUTH.get(MAIN_URL)
      .then(r => {
        setData(r.data);

        console.log(data);
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalInfo({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: () => navigate(loginRoute),
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalInfo({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      });
  }, []);

  // 에러 메시지 표시용 모달
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
    onClose: () => {},
  });

  return (
    <main className={styles.container}>
      <div className={styles.containerStatus}>
        <img className={styles.imgLogo} src={imgLogo} alt="슥싹 로고" />
        <p className={styles.textBlue}>오늘도 슥-싹한 하루!</p>
        <p className={styles.textTardy}>
          지금까지 {data.user_tardy_count}일 지각,
        </p>
        <p className={styles.textTardy}>
          총 {data.user_tardy_count * data.tardy_penalty}원을 기부하셨습니다💸
        </p>

        <AttendanceButton />
      </div>

      <TardyList data={data.absent_list} />
      <NoticeList data={data.notice_list} />

      <Navbar />

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={xModalInfo.onClose} />
      )}
    </main>
  );
}
