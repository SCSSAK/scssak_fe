import {useState, useEffect} from 'react';
import axios from 'axios';

import {logoImg} from '../assets/images';
import AttendanceButton from '../components/main/AttendanceButton';
import TardyList from '../components/main/TardyList';
import NoticeList from '../components/main/NoticeList';
import {BASE_URL} from '../router/Routes';

import styles from '../styles/pages/MainPage.module.css';

export default function MainPage() {
  const [data, setData] = useState({
    user_tardy_count: 0,
    tardy_penalty: 0,
    tardy_list: [],
    notice_list: [],
  });

  useEffect(() => {
    axios
      .create({
        baseURL: BASE_URL,
      })
      .get('/user/main')
      .then(r => {
        setData(r.data);
      })
      .catch(e => console.log(e));

    console.log('/user/main 요청 완료');
  });

  return (
    <main className={styles.container}>
      <div className={styles.containerStatus}>
        <img className={styles.imgLogo} src={logoImg} alt="슥싹 로고" />
        <p className={styles.textBlue}>오늘도 슥-싹한 하루!</p>
        <p className={styles.textTardy}>지금까지 </p>
        <p className={styles.textTardy}>
          총 {data.user_tardy_count}일 지각하셨군요!
        </p>

        <AttendanceButton />
      </div>

      <TardyList data={data.tardy_list} />
      <NoticeList data={data.notice_list} />
    </main>
  );
}
