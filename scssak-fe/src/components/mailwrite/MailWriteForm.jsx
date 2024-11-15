import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import {BASE_URL, mailboxRootRoute} from '../../router/Routes';
import styles from '../../styles/components/mailWrite/MailWriteForm.module.css';

export default function MailWriteForm({recevier_id}) {
  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [mailContent, setMailContent] = useState('');

  // 편지 보내기 버튼 클릭 처리
  const handleClickMailWriteButton = async () => {
    const data = {
      recevier_id: recevier_id,
      mail_content: mailContent,
    };

    axios
      .create({
        baseURL: BASE_URL,
      })
      .post('/mail', data)
      .then(() => {
        // TODO: 편지 보내기 성공 팝업 띄우기
        navigate(mailboxRootRoute + '/' + recevier_id);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.inputContent}
        type="text"
        placeholder="전하고 싶은 내용을 입력하세요! (200자 이내)"
        onChange={e => {
          setMailContent(e.target.value);
        }}
      />

      <button
        className={styles.buttonMailWrite}
        onClick={handleClickMailWriteButton}>
        편지 보내기
      </button>
    </div>
  );
}
