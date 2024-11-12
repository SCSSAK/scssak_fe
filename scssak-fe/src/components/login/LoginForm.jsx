import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import {BASE_URL, mainRoute} from '../../router/Routes';

export default function LoginForm() {
  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  // 로그인 버튼 클릭 처리
  const handleClickLoginButton = async () => {
    const data = {
      id: id,
      pwd: pwd,
    };

    const res = await axios
      .create({
        baseURL: BASE_URL,
      })
      .post('/user/login', data)
      .then(navigate(mainRoute))
      .catch(e => console.log(e));

    console.log(res);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        onChange={e => {
          setId(e.target.value);
        }}></input>
      <input
        type="password"
        placeholder="비밀번호"
        onChange={e => {
          setPwd(e.target.value);
        }}></input>

      <button onClick={handleClickLoginButton}>로그인</button>
    </div>
  );
}
