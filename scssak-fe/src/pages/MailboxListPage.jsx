import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import MailboxList from '../components/mailboxList/MailboxList';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import XModal from '../components/common/XModal';

import {API_AUTH} from '../apis/apiSettings';
import {MAIL_URL} from '../apis/apiUrls';

import {loginRoute} from '../router/Routes';

import styles from '../styles/pages/MailboxListPage.module.css';

export default function MailboxListPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    semester: 0,
    users: [],
  });

  useEffect(() => {
    API_AUTH.get(MAIL_URL)
      .then(r => {
        setData(r.data);
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

  // 에러 메시지 표시
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
    onClose: () => {},
  });

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <p className={styles.textTitle}>💌 {data.semester}기 우체통 💌</p>

        <MailboxList data={data.users} />
      </main>

      <Navbar />

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={xModalInfo.onClose} />
      )}
    </div>
  );
}
