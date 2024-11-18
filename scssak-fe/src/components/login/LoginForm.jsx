import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import styles from '../../styles/components/login/LoginForm.module.css';
import {BASE_URL, mainRoute} from '../../router/Routes';

export default function LoginForm() {
  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

  // 로그인 버튼 클릭 처리
  const handleClickLoginButton = async () => {
    try {
      const data = {
        id: id,
        pwd: pwd,
      };

      // 로그인 요청
      const response = await axios.post(`${BASE_URL}/user/login`, data);

      // 서버로부터 응답을 받았을 때 (status 200)
      if (response.status === 200) {
        const {access_token, refresh_token} = response.data;

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('userId', id);

        // 로그인 성공 후 메인 페이지로 이동
        navigate(mainRoute);
      } else {
        // 로그인 실패 시 처리 (예: 401 Unauthorized)
        setErrorMessage(
          '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.',
        );
      }
    } catch (e) {
      // 에러 처리 (예: 네트워크 문제 또는 서버 에러)
      console.error(e);
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={e => {
          setId(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pwd}
        onChange={e => {
          setPwd(e.target.value);
        }}
      />

      <button className={styles.loginButton} onClick={handleClickLoginButton}>
        로그인
      </button>

      {/* 에러 메시지 출력 */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
