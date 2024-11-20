import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import {iconSiren} from '../../assets/images';

import styles from '../../styles/components/main/NoticeList.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export default function NoticeList({data}) {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <img className={styles.imgSiren} src={iconSiren} alt="" />
        <span className={styles.textTitle}>오늘의 공지사항</span>
      </div>

      <Swiper
        className={styles.containerNoticeList}
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}>
        {data.map((item, idx) => {
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
