import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import Image from "next/image";
import { PageImage } from "types/types";

const MiddleDisplay = ({
  slides,
  slidesImgs,
}: {
  slides: PageImage[];
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
    <div className='col-span-12 md:col-span-6 p-1 w-full'>
      <Swiper
        className='rounded-2xl'
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        centeredSlides={true}
        spaceBetween={10}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className='h-64 md:h-80'>
              <Image
                alt='large-display'
                src={slideUrl(slide.url)}
                className='rounded-2xl bg-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MiddleDisplay;
