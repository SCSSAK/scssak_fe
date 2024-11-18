import {useState} from 'react';

import {API_AUTH} from '../../apis/apiSettings';
import {ATTEND_URL} from '../../apis/apiUrls';

import XModal from '../common/XModal';

import {buttonImgCheck} from '../../assets/images';
import styles from '../../styles/components/main/AttendanceButton.module.css';

export default function AttendanceButton() {
  // 출석 버튼 클릭 처리
  const handleClickAttendanceButton = async () => {
    API_AUTH.post(ATTEND_URL)
      .then(r => {
        setXModalInfo({
          isOpened: true,
          message: '성공적으로 출석되었습니다.',
        });
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (400, 출석 불가능)
          case 400:
            setXModalInfo({
              isOpened: true,
              message: '재학생이 아니거나,\n이미 출석되어 있습니다.',
            });
            break;

          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalInfo({
              isOpened: true,
              message: '로그인이 필요합니다.',
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

  // 에러 메시지 표시
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
  });

  return (
    <>
      <button
        className={styles.container}
        onClick={handleClickAttendanceButton}>
        <img className={styles.imgCheck} src={buttonImgCheck} alt="출석 버튼" />
        <span className={styles.textGray}>출석!</span>
      </button>

      {/* 에러 메시지 출력 */}
      {xModalInfo.isOpened && (
        <XModal
          message={xModalInfo.message}
          onClose={() => setXModalInfo({isOpened: false})}
        />
      )}
    </>
  );
}
