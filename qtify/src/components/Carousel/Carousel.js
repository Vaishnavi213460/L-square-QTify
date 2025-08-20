import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Card from "../Card/Card";
import styles from "./Carousel.module.css";

import LeftNavIcon from "../../assets/left-nav.svg";
import RightNavIcon from "../../assets/right-nav.svg";

function Carousel({ data, type }) {
  const swiperRef = useRef(null);

  return (
    <div className={styles.carouselContainer}>
      {/* Custom navigation buttons, now positioned correctly */}
      <div
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={() => swiperRef.current.slidePrev()}
      >
        <img src={LeftNavIcon} alt="Previous" className={styles.navIcon} />
      </div>
      <div
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={() => swiperRef.current.slideNext()}
      >
        <img src={RightNavIcon} alt="Next" className={styles.navIcon} />
      </div>

      {/* Swiper component wrapped in a div to manage its own padding */}
      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={7}
          slidesPerGroup={1} // Add this line
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: { slidesPerView: 2, slidesPerGroup: 1 },
            480: { slidesPerView: 3, slidesPerGroup: 1 },
            640: { slidesPerView: 4, slidesPerGroup: 1 },
            768: { slidesPerView: 5, slidesPerGroup: 1 },
            1024: { slidesPerView: 6, slidesPerGroup: 1 },
            1440: { slidesPerView: 7, slidesPerGroup: 1 },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Card data={item} isSong={type === "song"} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carousel;