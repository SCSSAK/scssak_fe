import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import {API_WITHOUT_AUTH} from '../../apis/apiSettings';
import {LOGIN_URL} from '../../apis/apiUrls';

import {mainRoute} from '../../router/Routes';

import styles from '../../styles/components/login/LoginForm.module.css';

export default function LoginForm() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXmodalState = useSetRecoilState(xModalAtom);

  // form 입력값
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  // 로그인 버튼 클릭 처리
  const handleClickLoginButton = async () => {
    const data = {
      id: id,
      pwd: pwd,
    };

    // 로그인 요청
    API_WITHOUT_AUTH.post(LOGIN_URL, data)
      .then(r => {
        // 서버로부터 응답을 받았을 때 (status 200)
        const {user_is_student, access_token, refresh_token} = r.data;

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('userId', id);
        localStorage.setItem('user_is_student', user_is_student);

        // 로그인 성공 후 메인 페이지로 이동
        navigate(mainRoute);
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인)
          case 401:
            setXmodalState({
              isOpened: true,
              message:
                '로그인에 실패했습니다.\n아이디 또는 비밀번호를 확인하세요.',
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXmodalState({
              isOpened: true,
              message: '서버와 통신 중 오류가 발생했습니다.',
            });
            break;
        }
      });
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
    </div>
  );
}
