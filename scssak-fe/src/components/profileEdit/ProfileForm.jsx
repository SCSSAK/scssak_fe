import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import styles from '../../styles/components/profileEdit/ProfileForm.module.css';

import {BASE_URL} from '../../router/Routes';

export default function ProfileForm({data}) {
  const temp_data = {
    user_company: '',
    user_department: '',
    user_position: '',
    user_email: '',
    user_sns: '',
    user_message: '',
  };

  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [userPwdCurrent, setUserPwdCurrent] = useState('');
  const [userPwdNew, setUserPwdNew] = useState('');
  const [userPwdNewCheck, setUserPwdNewCheck] = useState('');
  const [userCompany, setUserCompany] = useState(temp_data.user_company);
  const [userDepartment, setUserDepartment] = useState(
    temp_data.user_department,
  );
  const [userPosition, setUserPosition] = useState(temp_data.user_position);
  const [userEmail, setUserEmail] = useState(temp_data.user_email);
  const [userSns, setUserSns] = useState(temp_data.user_sns);
  const [userMessage, setUserMessage] = useState(temp_data.user_message);

  // 로그인 버튼 클릭 처리
  const handleClickLoginButton = async () => {
    const data = {
      user_pwd_current: userPwdCurrent,
      user_pwd_new: userPwdNew,
      user_company: userCompany,
      user_department: userDepartment,
      user_position: userPosition,
      user_email: userEmail,
      user_sns: userSns,
      user_message: userMessage,
    };

    const res = await axios
      .create({
        baseURL: BASE_URL,
      })
      .post('/user/profile', data)
      .then(() => {
        // TODO: 성공 팝업 표시하기
        navigate();
      })
      .catch(e => console.log(e));

    console.log(res);
  };

  const inputList = [
    {
      label: '*현재 비밀번호',
      type: 'password',
      placeholder: '기존 비밀번호를 입력해주세요',
      onChange: function (e) {
        setUserPwdCurrent(e.target.value);
      },
    },
    {
      label: '비밀번호 변경',
      type: 'password',
      placeholder: '새 비밀번호를 입력해주세요',
      onChange: function (e) {
        setUserPwdNew(e.target.value);
      },
    },
    {
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '새 비밀번호를 다시 입력해주세요',
      onChange: function (e) {
        setUserPwdNewCheck(e.target.value);
      },
    },
    {
      label: '재직 회사',
      type: 'text',
      placeholder: '재직중인 회사를 입력해주세요',
      onChange: function (e) {
        setUserCompany(e.target.value);
      },
    },
    {
      label: '부서',
      type: 'text',
      placeholder: '부서명을 입력해주세요',
      onChange: function (e) {
        setUserDepartment(e.target.value);
      },
    },
    {
      label: '직책',
      type: 'text',
      placeholder: '직책명을 입력해주세요',
      onChange: function (e) {
        setUserPosition(e.target.value);
      },
    },
    {
      label: '대표 이메일',
      type: 'text',
      placeholder: '메일을 입력해주세요',
      onChange: function (e) {
        setUserEmail(e.target.value);
      },
    },
    {
      label: 'SNS 계정',
      type: 'text',
      placeholder: 'Github, LinkedIn 등 입력해주세요',
      onChange: function (e) {
        setUserSns(e.target.value);
      },
    },
    {
      label: '자기 소개',
      type: 'text',
      placeholder: '자기 소개를 입력해주세요 (200자 내외)',
      onChange: function (e) {
        setUserMessage(e.target.value);
      },
    },
  ];

  return (
    <div className={styles.container}>
      {inputList.map(inputData => {
        return (
          <div className={styles.containerInput}>
            <label>{inputData.label}</label>
            <input
              type={inputData.type}
              placeholder={inputData.placeholder}
              onChange={e => inputData.onChange(e)}
            />
          </div>
        );
      })}

      <button className={styles.loginButton} onClick={handleClickLoginButton}>
        로그인
      </button>
    </div>
  );
}
