import axios from 'axios';

import {BASE_URL} from '../../router/Routes';

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

  return <button onClick={handleClickAttendanceButton}>출석</button>;
}
