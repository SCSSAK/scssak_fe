import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import {API_AUTH} from '../../apis/apiSettings';
import {ATTEND_URL} from '../../apis/apiUrls';

import {buttonImgCheck} from '../../assets/images';
import styles from '../../styles/components/main/AttendanceButton.module.css';

export default function AttendanceButton() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const refresh = () => navigate(0, {replace: true});

  // 출석 버튼 클릭 처리
  const handleClickAttendanceButton = async () => {
    await API_AUTH.post(ATTEND_URL)
      .then(r => {
        setXModalState({
          isOpened: true,
          message: '성공적으로 출석되었습니다.',
          onClose: refresh,
        });
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (400, 출석 불가능)
          case 400:
            setXModalState({
              isOpened: true,
              message: '재학생이 아니거나,\n이미 출석되어 있습니다.',
              onClose: refresh,
            });
            break;

          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: refresh,
            });
            break;

          // 에러 처리 (403, 올바르지 않은 IP에서 접근)
          case 403:
            setXModalState({
              isOpened: true,
              message: '강의장 Wifi를 연결 후\n출석해주세요.',
              onClose: refresh,
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalState({
              isOpened: true,
              message: '서버와 통신 중\n오류가 발생했습니다.',
              onClose: refresh,
            });
            break;
        }
      });
  };

  return (
    <>
      <button
        className={styles.container}
        onClick={handleClickAttendanceButton}>
        <img className={styles.imgCheck} src={buttonImgCheck} alt="출석 버튼" />
        <span className={styles.textGray}>출석!</span>
      </button>
    </>
  );
}
