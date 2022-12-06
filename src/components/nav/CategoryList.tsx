import { ListItem2 } from "../CategoryItems";
import menIcon from "public/men-fashion.webp";
import Image from "next/image";
import Link from "next/link";
import CategoryItem from "src/components/CategoryItem";
import { TFlex, THStack } from "src/components/TElements";
import { CategoryTypes } from "types/types";

const CategoryList = ({ category }: { category: any[] }) => {
  const categoryImgs = [
    { key: "men", img: menIcon },
    { key: "men", img: menIcon },
    { key: "men", img: menIcon },
    { key: "men", img: menIcon },
    { key: "men", img: menIcon },
  ];

  const categorySrc = (key: string) =>
    categoryImgs?.find((img) => img.key === key)?.img;

  return (
    <div className='col-span-12 md:col-span-8 row-span-1 relative md:w-auto'>
      <TFlex className='flex p-2 md:hidden justify-between'>
        <h2 className='text-base'>Popular</h2>
        <button>More</button>
      </TFlex>
      <TFlex className='items-center'>
        <h2 className='hidden md:block text-lg mr-10'>Popular</h2>
        <THStack className='overflow-x-auto whitespace-nowrap'>
          {category?.map((category) => {
            return (
              <CategoryItem
                key={category._id}
                category={category}
                src={categorySrc(category.tag) || menIcon}
              />
            );
          })}
        </THStack>
      </TFlex>
    </div>
  );
};

export default CategoryList;
