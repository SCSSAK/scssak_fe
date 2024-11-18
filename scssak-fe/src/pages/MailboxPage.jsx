import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import MailList from '../components/mailbox/MailList';
import MoveToMailWriteButton from '../components/mailbox/MoveToMailWriteButton';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import XModal from '../components/common/XModal';

import {API_AUTH} from '../apis/apiSettings';
import {MAIL_URL} from '../apis/apiUrls';

import {loginRoute} from '../router/Routes';

import go_back_arrow from '../assets/images/go_back_arrow.png';
import styles from '../styles/pages/MailboxPage.module.css';

export default function MailboxPage() {
  const {receiver_id} = useParams();

  const [data, setData] = useState({
    receiver_name: '',
    mail_list: [],
  });

  // page 이동
  const navigate = useNavigate();

  const handleClickGoBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    API_AUTH.get(MAIL_URL + '/' + receiver_id)
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

      <main className={styles.containerMain}>
        <div className={styles.containerTitle}>
          <img
            className={styles.iconGoBackArrow}
            src={go_back_arrow}
            alt="뒤로 가기 버튼"
            onClick={handleClickGoBackButton}
          />
          {data.receiver_name}님의 우체통 💌
        </div>

        <MailList data={data.mail_list} />

        <MoveToMailWriteButton
          data={{
            receiver_id: data.receiver_id,
            receiver_name: data.receiver_name,
          }}
        />
      </main>

      <Navbar />

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={xModalInfo.onClose} />
      )}
    </div>
  );
}
