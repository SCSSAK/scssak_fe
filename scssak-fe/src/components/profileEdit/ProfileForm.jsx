import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {xModalAtom} from '../../recoil/atom';

import ConfirmModal from '../common/ConfirmModal';

import {API_AUTH_FILE} from '../../apis/apiSettings';
import {PROFILE_URL} from '../../apis/apiUrls';

import {profileRootRoute} from '../../router/Routes';

import styles from '../../styles/components/profileEdit/ProfileForm.module.css';

export default function ProfileForm({data}) {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const [xModalState, setXmodalState] = useRecoilState(xModalAtom);

  // form 입력값
  const [userImg, setUserImg] = useState();
  const [userPwdCurrent, setUserPwdCurrent] = useState('');
  const [userPwdNew, setUserPwdNew] = useState('');
  const [userPwdNewCheck, setUserPwdNewCheck] = useState('');
  const [userCompany, setUserCompany] = useState(data.user_company);
  const [userDepartment, setUserDepartment] = useState(data.user_department);
  const [userPosition, setUserPosition] = useState(data.user_position);
  const [userEmail, setUserEmail] = useState(data.user_email);
  const [userSns, setUserSns] = useState(data.user_sns);
  const [userMessage, setUserMessage] = useState(data.user_message);

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
  const [userImgURL, setUserImgURL] = useState(data.user_img);

  // 이미지 업로드 버튼 클릭 처리
  const handleClickImgUploadButton = () => {
    // 이미지 등록 창 표시
    userImgRef.current?.click();
  };

  // 새로운 이미지 등록 처리
  const handleChangeImgInput = async e => {
    const imgList = e.target.files;

    if (imgList === null || imgList.length === 0) {
      return;
    }

    const img = imgList[0];
    const url = URL.createObjectURL(img);

    // 이미지 용량이 20mb를 초과하는 경우
    if (img.size > 20 * 1024 * 1024) {
      setXmodalState({
        isOpened: true,
        message: '20MB 이하의 파일만\n업로드할 수 있습니다.',
      });
      return;
    }

    // 이미지 파일이 아닌 경우
    if (!img.type.startsWith('image')) {
      setXmodalState({
        isOpened: true,
        message: '이미지 파일만\n업로드할 수 있습니다.',
      });
      return;
    }

    setUserImg(img);
    setUserImgURL(url);
  };

  // 프로필 변경 버튼 클릭 처리
  const handleClickEditProfileButton = () => {
    // 기존 비밀번호를 입력하지 않은 경우
    if (userPwdCurrent === null || userPwdCurrent === '') {
      setXmodalState({
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
      setXmodalState({
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

    const formData = new FormData();
    formData.append('user_pwd_current', userPwdCurrent);
    if (userPwdNew || userPwdNewCheck) {
      formData.append('user_pwd_new', userPwdNew);
      formData.append('user_pwd_new_check', userPwdNewCheck);
    }
    formData.append('user_company', userCompany);
    formData.append('user_department', userDepartment);
    formData.append('user_position', userPosition);
    formData.append('user_email', userEmail);
    formData.append('user_sns', userSns);
    formData.append('user_message', userMessage);
    if (userImg) {
      formData.append('user_img', userImg);
    }

    API_AUTH_FILE.put(PROFILE_URL, formData)
      .then(r => {
        navigate(profileRootRoute + '/' + localStorage.getItem('userId'));
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 현재 비밀번호 오류)
          case 401:
            setXmodalState({
              isOpened: true,
              message: '입력하신 비밀번호를\n다시 확인해주세요.',
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
        <input value={data.user_name} disabled />
      </div>

      {inputList.map(inputData => {
        return (
          <div key={inputData.label} className={styles.containerInput}>
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
    </div>
  );
}
