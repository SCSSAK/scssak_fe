import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';

export default function NoticeList({data}) {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>오늘의 공지사항</p>
      </div>

      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        loop={true}
        pagination={{clickable: true, type: 'bullets'}}>
        {data.map(item => {
          return <SwiperSlide>{item}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
