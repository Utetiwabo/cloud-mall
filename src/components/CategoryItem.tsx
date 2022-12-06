import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { TFlex } from "./TElements";

const CategoryItem = ({
  category,
  src,
}: {
  category: {
    id: number;
    name: string;
  };
  src: StaticImageData;
}) => {
  return (
    <Link
      key={category.id}
      href={`/category/${category.name.replace(/\s+/g, "").toLowerCase()}`}
      className='w-full'>
      <TFlex className='mx-auto w-fit border border-[#3c3c4349] rounded-full p-1'>
        <Image
          alt=''
          src={src}
          style={{ borderRadius: "50%" }}
          // width={55}
          // height={55}
        />
      </TFlex>
      <p className='font-semibold text-[12px]'>{category.name}</p>
    </Link>
  );
};

export default CategoryItem;
