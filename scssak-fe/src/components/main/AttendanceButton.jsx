import axios from 'axios';

import {BASE_URL} from '../../router/Routes';

import {buttonCheckImg} from '../../assets/images';
import styles from '../../styles/components/main/AttendanceButton.module.css';

export default function AttendanceButton() {
  // 출석 버튼 클릭 처리
  const handleClickAttendanceButton = async () => {
    const res = await axios
      .create({
        baseURL: BASE_URL,
      })
      .post('/user/attend')
      .then(r => console.log(r))
      .catch(e => console.log(e));

    console.log(res);
  };

  return (
    <button className={styles.container} onClick={handleClickAttendanceButton}>
      <img className={styles.imgCheck} src={buttonCheckImg} alt="출석 버튼" />
      <span className={styles.textGray}>출석!</span>
    </button>
  );
}
