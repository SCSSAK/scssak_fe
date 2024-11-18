import {useNavigate} from 'react-router-dom';

import {mailboxRootRoute} from '../../router/Routes';

import styles from '../../styles/components/mailbox/MoveToMailWriteButton.module.css';

export default function MoveToMailWriteButton({receiver_id, receiver_name}) {
  // page 이동
  const navigate = useNavigate();

  // 글쓰기 버튼 클릭 처리
  const handleClickMoveToMailWriteButton = () => {
    navigate(mailboxRootRoute + '/write/' + receiver_id, {
      state: {receiver_name: receiver_name},
    });
  };

  return (
    <button
      className={styles.buttonMoveToWrite}
      onClick={handleClickMoveToMailWriteButton}>
      글쓰기
    </button>
  );
}
