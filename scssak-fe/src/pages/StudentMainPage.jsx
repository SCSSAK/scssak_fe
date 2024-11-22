import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

import AttendanceButton from '../components/main/AttendanceButton';
import TardyList from '../components/main/TardyList';
import NoticeList from '../components/main/NoticeList';
import PopularArticleList from '../components/main/PopularArticleList';

import {API_AUTH} from '../apis/apiSettings';
import {MAIN_URL} from '../apis/apiUrls';

import {loginRoute} from '../router/Routes';

import styles from '../styles/pages/StudentMainPage.module.css';

export default function StudentMainPage() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  // 표시할 데이터
  const [data, setData] = useState({
    user_tardy_count: 0,
    tardy_penalty: 0,
    absent_list: [],
    notice_list: [],
    popular_article_list_opened_true: [],
    popular_article_list_opened_false: [],
  });

  // main api 호출
  useEffect(() => {
    API_AUTH.get(MAIN_URL)
      .then(r => {
        setData(r.data);
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
              message: '서버와 통신 중\n오류가 발생했습니다.',
            });
            break;
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerStatus}>
        <p className={styles.textBlue}>오늘도 슥-싹한 하루!</p>
        <p className={styles.textTardy}>지금까지</p>
        <p className={styles.textTardy}>
          총 {data.user_tardy_count}일 지각해서
        </p>
        <p className={styles.textTardy}>
          {data.tardy_penalty}원 기부했습니다💸
        </p>

        <AttendanceButton />
      </div>

      <TardyList data={data.absent_list} />
      <NoticeList data={data.notice_list} />
      <PopularArticleList
        opened={true}
        data={data.popular_article_list_opened_true}
      />
      <PopularArticleList
        opened={false}
        data={data.popular_article_list_opened_false}
      />
    </div>
  );
}
