import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import "swiper/css";
import { Autoplay } from "swiper";
import { PageMedia } from "types/types";
import { TStack } from "src/components/TElements";

const Display1 = ({ smSlide }: { smSlide: PageMedia[] }) => {
  // const halve = Math.round(smSlide.length / 2);
  // const split1 = smSlide.slice(0, halve);
  // const split2 = smSlide.slice(halve);
  // console.log(split1, split2);

  // SwiperCore.use([Autoplay]);
  return (
    <TStack className='col-span-12 md:col-span-2 h-full drop-shadow-lg '>
      <Swiper
        className='w-full h-full rounded-2xl '
        slidesPerView={1}
        autoplay={{ delay: 3000, reverseDirection: true }}
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        modules={[Autoplay]}>
        {smSlide.map((slide) => (
          <SwiperSlide
            className='z-0 bg-white rounded-3xl border border-bordergray p-4 flex flex-col items-center justify-center'
            key={slide.id}>
            <p className='text-5xl text-center text-red-500'>{slide.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </TStack>
  );
};

export default Display1;
