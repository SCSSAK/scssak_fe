import {useNavigate} from 'react-router-dom';

import {mailboxRootRoute} from '../../router/Routes';

export default function MoveToMailWriteButton({receiver_id, receiver_name}) {
  // page 이동
  const navigate = useNavigate();

  // 글쓰기 버튼 클릭 처리
  const handleClickMoveToMailWriteButton = () => {
    navigate(mailboxRootRoute + '/write/' + receiver_id, {
      state: {receiver_name: receiver_name},
    });
  };

  return <button onClick={handleClickMoveToMailWriteButton}>글쓰기</button>;
}
