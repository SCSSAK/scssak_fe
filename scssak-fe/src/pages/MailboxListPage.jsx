import axios from 'axios';

import {BASE_URL} from '../router/Routes';
import {useState, useEffect} from 'react';
import {
  mailbox01Img,
  mailbox02Img,
  mailbox03Img,
  mailbox04Img,
  mailbox05Img,
  mailboxWithNotification01Img,
  mailboxWithNotification02Img,
  mailboxWithNotification03Img,
  mailboxWithNotification04Img,
  mailboxWithNotification05Img,
} from '../assets/images/index';

export default function MailboxListPage() {
  const [data, setData] = useState([]);

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
    <div>
      <main>
        <p>💌 {data.semester}기 우체통 💌</p>
      </main>
    </div>
  );
}
