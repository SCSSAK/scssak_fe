import {
  iconEmail,
  iconSns,
  iconIntroduce,
  iconUser,
} from '../../assets/images/index';

import styles from '../../styles/components/profile/Profile.module.css';

export default function Profile({data}) {
  return (
    <div className={styles.container}>
      <div className={styles.containerInfo}>
        <img
          className={styles.imgProfile}
          src={data.user_img ?? iconUser}
          alt="프로필 이미지"
        />
        <div className={styles.containerInfoText}>
          <div className={styles.containerName}>
            <span className={styles.textSemester}>{data.user_semester}기</span>
            <span className={styles.textName}>{data.user_name}</span>
          </div>

          <p className={styles.textCompany}>{data.user_company}</p>

          <span className={styles.textDepartment}>{data.user_department}</span>
          <span className={styles.textPosition}>{data.user_position}</span>

          <p className={styles.textContactTitle}>CONTACT</p>

          <div className={styles.containerContact}>
            <img
              className={styles.imgContactIcon}
              src={iconEmail}
              alt="이메일 아이콘"
            />
            <span className={styles.textContact}>{data.user_email}</span>
          </div>
          <div className={styles.containerContact}>
            <img
              className={styles.imgContactIcon}
              src={iconSns}
              alt="SNS 아이콘"
            />
            <span className={styles.textContact}>{data.user_sns}</span>
          </div>
        </div>
      </div>

      <div className={styles.containerIntroduce}>
        <div className={styles.containerIntroduceTitle}>
          <img
            className={styles.imgIntroduceIcon}
            src={iconIntroduce}
            alt="자기소개 아이콘"
          />
          <span className={styles.textIntroduceTitle}>자기 소개</span>
        </div>

        <p className={styles.textIntroduce}>{data.user_message}</p>
      </div>
    </div>
  );
}
