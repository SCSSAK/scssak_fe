import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import {iconSiren} from '../../assets/images';

import styles from '../../styles/components/main/NoticeList.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export default function NoticeList({data}) {
  const temp_data = ['공지사항 1번', '공지사항 2번', '공지사항 3번'];

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <img className={styles.imgSiren} src={iconSiren} alt="" />
        <span className={styles.textTitle}>오늘의 공지사항</span>
      </div>

      <Swiper
        className={`swiper ${styles.containerNoticeList}`}
        modules={[Pagination]}
        slidesPerView={1}
        loop={true}
        pagination={{clickable: true, type: 'bullets'}}>
        {temp_data.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <p className={styles.itemNotice}>{item}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
