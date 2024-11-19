import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

import MailboxList from '../components/mailboxList/MailboxList';

import {API_AUTH} from '../apis/apiSettings';
import {MAIL_URL} from '../apis/apiUrls';

import {loginRoute} from '../router/Routes';

import styles from '../styles/pages/MailboxListPage.module.css';

export default function MailboxListPage() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const [xModalState, setXmodalState] = useRecoilState(xModalAtom);

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
            setXmodalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: () => navigate(loginRoute),
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXmodalState({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.textTitle}>💌 {data.semester}기 우체통 💌</p>

      <MailboxList data={data.users} />
    </div>
  );
}
