import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export default function Login() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const handleClickLoginButton = async () => {
    const data = {
      id: id,
      pwd: pwd,
    };

    const res = await axios
      .create({
        baseURL: BASE_URL,
      })
      .post('/user/login', data);

    console.log(res.status);
    console.log(res.data);

    return res;
  };

  return (
    <div>
      <main>
        <p>슥사 새싹들의 커뮤니티, 슥싹</p>

        <img src="./logo.svg" />

        <p>커뮤니티 하나로 출석부터 꿀팁 공유까지 한 번에!</p>
        <p>슥사로의 여정, 시작해볼까요?</p>

        <input
          type="text"
          placeholder="아이디"
          onChange={e => {
            setId(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={e => {
            setPwd(e.target.value);
          }}
        ></input>

        <button id="loginButton" onClick={handleClickLoginButton}>
          로그인
        </button>
      </main>
    </div>
  );
}
