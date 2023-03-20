import React, { useEffect } from "react";
import { BannerItem } from "./BannerItem";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
export const Banner = ({ data }) => {

  const pagination = {
    el: ".banner-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  useEffect(()=>{
    const mediaQuery = window.matchMedia('(min-width:1024px)');
    if (mediaQuery.matches){
      resize()
      window.addEventListener('resize',resize)
      function resize(){
          if (window.innerHeight<700){
            document.querySelectorAll('.slider-item .content-box').forEach((element,index)=>{
              element.style.transform = `scale(${window.innerHeight/5*3/400})`
            })
          } else {
            document.querySelectorAll('.slider-item .content-box').forEach((element,index)=>{
              element.style.transform = `scale(1)`
            })
          }

      }
    }
  })
  
  return (
    <div className="banner-wrapper container">

      <div className="swiper-pagination banner-pagination"></div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={pagination}
        loop={true}
        speed={1500}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={true}
        className="banner"
      >
        {
          data.map((value, index) => {
            return (

              <SwiperSlide key={index}>
                <BannerItem dataItem={value} />
              </SwiperSlide>

            )
          })
        }

      </Swiper>

    </div>
  );
};