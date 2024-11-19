import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import XModal from '../common/XModal';

import {API_AUTH} from '../../apis/apiSettings';
import {MAIL_URL} from '../../apis/apiUrls';

import {mailboxRootRoute} from '../../router/Routes';

import styles from '../../styles/components/mailWrite/MailWriteForm.module.css';

export default function MailWriteForm({receiver_id}) {
  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [mailContent, setMailContent] = useState('');

  // 편지 보내기 버튼 클릭 처리
  const handleClickMailWriteButton = async () => {
    setMailContent(mailContent.trim());

    if (mailContent === null || mailContent.length === 0) {
      setXModalInfo({
        isOpened: true,
        message: '내용을 작성해주세요.',
      });
      return;
    }

    const data = {
      receiver_id: receiver_id,
      mail_content: mailContent,
    };

    API_AUTH.post(MAIL_URL, data)
      .then(() => {
        setXModalInfo({
          isOpened: true,
          message: '편지가 성공적으로 보내졌습니다.',
          onClose: () => navigate(mailboxRootRoute + '/' + receiver_id),
        });
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (400, 내용이 비어있음)
          case 400:
            setXModalInfo({
              isOpened: true,
              message: '내용을 작성해주세요.',
            });
            break;

          // 에러 처리 (401, 비로그인 혹은 수신자가 다른 기수)
          case 401:
            setXModalInfo({
              isOpened: true,
              message: '로그인 후, 동일 기수에게만\n편지를 보낼 수 있습니다.',
            });
            break;

          // 에러 처리 (404, 존재하지 않는 수신자)
          case 404:
            setXModalInfo({
              isOpened: true,
              message: '수신자가 존재하지 않습니다.',
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
  };

  // 에러 메시지 표시용 모달
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
    onClose: () => {},
  });

  return (
    <div className={styles.container}>
      <textarea
        className={styles.inputContent}
        type="text"
        placeholder="전하고 싶은 내용을 입력하세요! (200자 이내)"
        maxLength={220}
        onChange={e => {
          setMailContent(e.target.value);
        }}
      />

      <button
        className={styles.buttonMailWrite}
        onClick={handleClickMailWriteButton}>
        편지 보내기
      </button>

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={xModalInfo.onClose} />
      )}
    </div>
  );
}
