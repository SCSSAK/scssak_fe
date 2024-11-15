import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import ConfirmModal from '../common/ConfirmModal';
import XModal from '../common/XModal';
import {BASE_URL} from '../../router/Routes';

import styles from '../../styles/components/profileEdit/ProfileForm.module.css';

export default function ProfileForm({data}) {
  const temp_data = {
    user_name: '테스트',
    user_company: '',
    user_department: '',
    user_position: '',
    user_email: '',
    user_sns: '',
    user_message: '',
    user_img: '',
  };

  // page 이동
  const navigate = useNavigate();

  // form 입력값
  const [userImg, setUserImg] = useState();
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

  const inputList = [
    {
      label: '*현재 비밀번호',
      type: 'password',
      placeholder: '기존 비밀번호를 입력해주세요',
      value: userPwdCurrent,
      onChange: function (e) {
        setUserPwdCurrent(e.target.value);
      },
    },
    {
      label: '비밀번호 변경',
      type: 'password',
      placeholder: '새 비밀번호를 입력해주세요',
      value: userPwdNew,
      onChange: function (e) {
        setUserPwdNew(e.target.value);
      },
    },
    {
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '새 비밀번호를 다시 입력해주세요',
      value: userPwdNewCheck,
      onChange: function (e) {
        setUserPwdNewCheck(e.target.value);
      },
    },
    {
      label: '재직 회사',
      type: 'text',
      placeholder: '재직중인 회사를 입력해주세요',
      value: userCompany,
      onChange: function (e) {
        setUserCompany(e.target.value);
      },
    },
    {
      label: '부서',
      type: 'text',
      placeholder: '부서명을 입력해주세요',
      value: userDepartment,
      onChange: function (e) {
        setUserDepartment(e.target.value);
      },
    },
    {
      label: '직책',
      type: 'text',
      placeholder: '직책명을 입력해주세요',
      value: userPosition,
      onChange: function (e) {
        setUserPosition(e.target.value);
      },
    },
    {
      label: '대표 이메일',
      type: 'text',
      placeholder: '메일을 입력해주세요',
      value: userEmail,
      onChange: function (e) {
        setUserEmail(e.target.value);
      },
    },
    {
      label: 'SNS 계정',
      type: 'text',
      placeholder: 'Github, LinkedIn 등 입력해주세요',
      value: userSns,
      onChange: function (e) {
        setUserSns(e.target.value);
      },
    },
  ];

  // 새로 등록하는 이미지
  const userImgRef = useRef(null);
  const [userImgURL, setUserImgURL] = useState(temp_data.user_img);
  var isImgChanged = false;

  // 이미지 업로드 버튼 클릭 처리
  const handleClickImgUploadButton = () => {
    // 이미지 등록 창 표시
    userImgRef.current?.click();
  };

  // 새로운 이미지 등록 처리
  const handleChangeImgInput = e => {
    const imgList = e.target.files;

    if (imgList === null || imgList.length === 0) {
      return;
    }

    const img = imgList[0];
    const url = URL.createObjectURL(img);

    // 이미지 용량이 20mb를 초과하는 경우
    if (img.size > 20 * 1024 * 1024) {
      setXModalInfo({
        isOpened: true,
        message: '20MB 이하의 파일만\n업로드할 수 있습니다.',
      });
      return;
    }

    // 이미지 파일이 아닌 경우
    if (!img.type.startsWith('image')) {
      setXModalInfo({
        isOpened: true,
        message: '이미지 파일만\n업로드할 수 있습니다.',
      });
      return;
    }

    isImgChanged = true;
    setUserImg(img);
    setUserImgURL(url);
  };

  // 프로필 변경 버튼 클릭 처리
  const handleClickEditProfileButton = () => {
    // 기존 비밀번호를 입력하지 않은 경우
    if (userPwdCurrent === null || userPwdCurrent === '') {
      setXModalInfo({
        isOpened: true,
        message: '현재 비밀번호는\n필수 입력값입니다.',
      });
      return;
    }

    // 새 비밀번호를 입력하지 않고 새 비밀번호 확인을 입력한 경우 > 무시
    if (userPwdNew === null || userPwdNew === '') {
      setUserPwdNewCheck('');
    } else if (userPwdNew !== userPwdNewCheck) {
      // 새 비밀번호를 입력했는데 새 비밀번호 확인과 동일하지 않은 경우
      setXModalInfo({
        isOpened: true,
        message: '비밀번호 확인이\n일치하지 않습니다.',
      });
      return;
    }

    setIsConfirmModalOpened(true);
  };

  // 변경 확인 모달
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);

  const handleCancel = () => {
    setIsConfirmModalOpened(false);
  };

  const handleConfirm = async () => {
    setIsConfirmModalOpened(false);

    const data = new FormData();
    data.append('user_pwd_current', userPwdCurrent);
    data.append('user_pwd_new', userPwdNew);
    data.append('user_pwd_new_check', userPwdNewCheck);
    data.append('user_company', userCompany);
    data.append('user_department', userDepartment);
    data.append('user_position', userPosition);
    data.append('user_email', userEmail);
    data.append('user_sns', userSns);
    data.append('user_message', userMessage);
    data.append('user_img', userImg);

    axios
      .put(BASE_URL + '/user/profile', data)
      .then(r => {
        console.log(r);

        setXModalInfo({
          isOpened: true,
          message: '비밀번호 확인이\n일치하지 않습니다.',
        });

        // TODO: 자기 프로필 페이지로 돌아가기
        navigate();
      })
      .catch(error => {
        console.log(error);

        if (error.response) {
          const {status} = error.response;

          if (status === 401) {
            setXModalInfo({
              isOpened: true,
              message: '입력하신 비밀번호를\n다시 확인해주세요.',
            });
          } else if (status === 500) {
            setXModalInfo({
              isOpened: true,
              message: '서버 오류가 발생하여\n변경에 실패했습니다.',
            });
          }
        }
      });
  };

  // 닫기 버튼만 있는 모달
  const [xModalInfo, setXModalInfo] = useState({
    isOpened: false,
    message: '',
  });

  const handleCloseXModal = () => {
    setXModalInfo({isOpened: false});
  };

  return (
    <div>
      <div className={styles.containerProfileImg}>
        <img className={styles.imgProfile} src={userImgURL} alt="프로필 사진" />
        <button
          className={styles.buttonChangeImg}
          onClick={handleClickImgUploadButton}>
          이미지 변경
        </button>
        <input
          style={{display: 'none'}}
          type="file"
          accept={'image/*'}
          ref={userImgRef}
          onChange={handleChangeImgInput}
        />
      </div>

      <div className={styles.containerInput}>
        <label>이름</label>
        <input value={temp_data.user_name} disabled />
      </div>

      {inputList.map(inputData => {
        return (
          <div className={styles.containerInput}>
            <label htmlFor={inputData.label}>{inputData.label}</label>
            <input
              id={inputData.label}
              type={inputData.type}
              placeholder={inputData.placeholder}
              value={inputData.value}
              onChange={e => inputData.onChange(e)}
            />
          </div>
        );
      })}

      <div className={styles.containerInput}>
        <label htmlFor="자기 소개">자기 소개</label>
        <textarea
          placeholder="자기 소개를 입력해주세요 (200자 내외)"
          maxLength={220}
          value={userMessage}
          onChange={e => setUserMessage(e.target.value)}
        />
      </div>

      <div className={styles.containerButton}>
        <button
          className={styles.profileEditButton}
          onClick={handleClickEditProfileButton}>
          변경 완료
        </button>
      </div>

      {isConfirmModalOpened && (
        <ConfirmModal
          message="변경하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {xModalInfo.isOpened && (
        <XModal message={xModalInfo.message} onClose={handleCloseXModal} />
      )}
    </div>
  );
}
