import React from "react";
// Import Swiper React components
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";

import "../custom.css";
const Slider = ({ images, autoplay }) => {
  return (
    <>
      {autoplay && autoplay ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {images &&
            images.map((i, index) => (
              <SwiperSlide key={index}>
                <Link to={i.link}>
                  <img className="w-100" src={i.imageSrc} alt={i.alt} />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
        >
          {images &&
            images.map((i) => (
              <SwiperSlide key={i.id}>
                <Link to={i.link}>
                  <img className="w-100" src={i.imageSrc} alt={i.alt} />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
