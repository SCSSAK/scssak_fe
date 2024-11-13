import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {BASE_URL} from '../router/Routes';
import MailList from '../components/mailbox/MailList';
import MoveToMailWriteButton from '../components/mailbox/MoveToMailWriteButton';

export default function MailboxPage() {
  const {user_id} = useParams();

  const [data, setData] = useState({
    receiver_id: user_id,
    receiver_name: '조예지',
    mail_list: [
      {
        mail_id: 1,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 2,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 3,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 4,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 5,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 6,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 7,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 8,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 9,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
      {
        mail_id: 10,
        mail_content: '편지 내용',
        mail_created_at: '2024-11-11',
      },
    ],
  });

  useEffect(() => {
    axios
      .create({
        baseURL: BASE_URL,
      })
      .get(`/mail/${user_id}`)
      .then(r => {
        setData(r.data);
      })
      .catch(e => console.log(e));

    console.log(`/mail/${user_id} 요청 완료`);
  });

  return (
    <div>
      <main>
        <p>{data.receiver_name}님의 우체통 💌</p>

        <MailList data={data.mail_list} />

        <MoveToMailWriteButton
          data={{
            receiver_id: data.receiver_id,
            receiver_name: data.receiver_name,
          }}
        />
      </main>
    </div>
  );
}
