import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { dataTrailer } from "../../traillerMovie/trailler";
import { Pagination } from "swiper";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";
import { FCDialog } from "../../component/FCDialog";
export const SlideMovieHot = () => {
  const [open, setOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const handleShowTrailer = (item) => {
    setOpen(true);
    setUrlVideo(item);
  };
  const handleClose = () => {
    setOpen(false);
    setUrlVideo("");
  };
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper swiper-wraper"
      >
        <div className="">
          {dataTrailer.map((item, index) => (
            <>
              <SwiperSlide key={index}>
                <img src={item.image} alt="1" />
                <div className="item-hover-trailer">
                  <PlayCircleFilledWhiteIcon
                    onClick={() => handleShowTrailer(item.iframetrailer)}
                  />
                </div>
              </SwiperSlide>
            </>
          ))}
        </div>
        <FCDialog
          size="md"
          open={open}
          handleClose={handleClose}
          content={
            <iframe
              width="100%"
              height="420"
              src={urlVideo}
              title="Phim Thế Giới Khủng Long: Lãnh Địa Trailer | KC 10.06.2022"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          }
        />
      </Swiper>
    </>
  );
};
