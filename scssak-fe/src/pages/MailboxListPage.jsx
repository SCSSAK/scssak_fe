import {useState, useEffect} from 'react';
import axios from 'axios';

import {BASE_URL} from '../router/Routes';
import MailboxList from '../components/mailboxList/MailBoxList';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

import styles from '../styles/pages/MailboxListPage.module.css';

export default function MailboxListPage() {
  const [data, setData] = useState({
    semester: 23,
    users: [
      {
        user_id: 'scsa23001',
        user_name: '김광수',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23002',
        user_name: '김다빈',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23003',
        user_name: '김동규',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23004',
        user_name: '김동현',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23005',
        user_name: '김민협',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23006',
        user_name: '김주승',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23007',
        user_name: '김준하',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23008',
        user_name: '김혜민',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23009',
        user_name: '박설진',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23010',
        user_name: '박수영',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23011',
        user_name: '배태용',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23012',
        user_name: '서지은',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23013',
        user_name: '손상범',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23014',
        user_name: '이건',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23015',
        user_name: '이동인',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23016',
        user_name: '이주빈',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23017',
        user_name: '정내혁',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23018',
        user_name: '조예지',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23019',
        user_name: '하제우',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23020',
        user_name: '황윤영',
        has_new_mail: true,
      },
    ],
  });

  useEffect(() => {
    axios
      .create({
        baseURL: BASE_URL,
      })
      .get('/mail')
      .then(r => {
        setData(r.data);
      })
      .catch(e => console.log(e));

    console.log('/mail 요청 완료');
  });

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <p className={styles.textTitle}>💌 {data.semester}기 우체통 💌</p>

        <MailboxList data={data.users} />
      </main>

      <Navbar />
    </div>
  );
}
