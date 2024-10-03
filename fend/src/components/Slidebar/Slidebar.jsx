import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay } from "swiper/modules";


import { dataSlidebar } from "../../Data/data";

const Slidebar = () => {
  return (
    <div className="w-[80%] h-[300px] md:h-[450px]  mt-10 bg-zinc-600 ">
      <Swiper
        effect={"coverflow"}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {dataSlidebar.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[300px] md:h-[450px] ">
              <img
                src={data.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>{" "}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slidebar;
