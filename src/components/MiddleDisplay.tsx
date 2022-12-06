import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import Image from "next/image";
import { PageImage } from "types/types";
import { TFlex, TStack } from "./TElements";

const MiddleDisplay = ({
  slides,
  slidesImgs,
}: {
  slides?: PageImage[];
  slidesImgs: any;
}) => {
  const { slide1, slide2, slide3 } = slidesImgs;

  const slideUrl = (key: string) => {
    return key === "slide1"
      ? slide1
      : key === "slide2"
      ? slide2
      : key === "slide3" && slide3;
  };

  // console.log(slides);

  return (
    <div className='h-full pt-1 w-full'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 10000 }}
        // loop={true}
        centeredSlides={true}
        spaceBetween={20}>
        {slides?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <TFlex className='mx-auto lg:rounded-md w-full'>
              <Image
                className='w-full'
                alt='large-display'
                src={slideUrl(slide.url)}
                // style={{ borderRadius: "10px" }}
                // width={1920}
                // height={900}
              />
            </TFlex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MiddleDisplay;
