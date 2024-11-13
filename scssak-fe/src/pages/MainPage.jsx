import {useState, useEffect} from 'react';
import axios from 'axios';

import {logoImg} from '../assets/images';
import AttendanceButton from '../components/main/AttendanceButton';
import TardyList from '../components/main/TardyList';
import NoticeList from '../components/main/NoticeList';
import {BASE_URL} from '../router/Routes';

export default function MainPage() {
  const [data, setData] = useState({
    user_present_count: 0,
    user_tardy_count: 0,
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
    <div>
      <header>
        <img src={logoImg} />
      </header>

      <main>
        <div>
          <p>오늘도 슥-싹한 하루!</p>
          <p>
            이번 달은 {data.user_present_count}일 출석, {data.user_tardy_count}
            일 지각 하셨군요!
          </p>
          <AttendanceButton />
        </div>
        <TardyList data={data.tardy_list} />
        <NoticeList data={data.notice_list} />
      </main>
    </div>
  );
}
