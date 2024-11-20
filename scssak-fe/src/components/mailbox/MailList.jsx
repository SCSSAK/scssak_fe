import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import {API_AUTH} from '../../apis/apiSettings';
import {MAIL_URL} from '../../apis/apiUrls';

import {loginRoute} from '../../router/Routes';

import {iconDelete} from '../../assets/images/index';

import styles from '../../styles/components/mailbox/MailList.module.css';

export default function MailList({data}) {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const loginedUserId = localStorage.getItem('userId');

  const handleClickDeleteMailButton = mail_id => {
    API_AUTH.delete(MAIL_URL + '/' + mail_id)
      .then(r =>
        setXModalState({
          isOpened: true,
          message: '편지가 성공적으로 삭제되었습니다.',
          onClose: () => setXModalState({isOpened: false}),
        }),
      )
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인 혹은 자신이 작성한 편지가 아님)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인 후, 본인이 작성한 편지만\n삭제할 수 있습니다.',
              onClose: () => navigate(loginRoute),
            });
            break;

          // 에러 처리 (404, 존재하지 않는 편지 번호)
          case 404:
            setXModalState({
              isOpened: true,
              message: '존재하지 않는 편지입니다.',
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalState({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      });
  };

  return (
    <div className={styles.container}>
      {data.map((mail, idx) => {
        return (
          <div key={idx} className={styles.containerMail}>
            {mail.mail_writer_id === loginedUserId && (
              <img
                className={styles.iconDeleteMail}
                src={iconDelete}
                alt="편지 삭제 버튼"
                onClick={() => handleClickDeleteMailButton(mail.mail_id)}
              />
            )}
            <p className={styles.textMailContent}>{mail.mail_content}</p>
            <p className={styles.textMailCreatedAt}>{mail.mail_created_at}</p>
          </div>
        );
      })}
    </div>
  );
}
