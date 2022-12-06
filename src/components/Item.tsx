import Link from "next/link";
import { ItemTypes } from "types/types";
import { limitText } from "@lib/helpers";

export const ItemGrid = ({ product }: { product: ItemTypes }) => {
  return (
    <Link key={product._id} href={`/item/${product._id}`}>
      <div className='group cursor-pointer space-y-1 bg-white rounded-xl z-0'>
        <div className=' bg-black w-full h-36 lg:h-52 rounded-t-xl group-hover:opacity-75' />

        <div className='mt-4 pb-1 px-2'>
          <p className='whitespace-nowrap text-sm lg:text-lg text-start text-gray-700  '>
            {limitText(product.title, 21)}
          </p>
          <p className=' text-xl font-medium ml-4 text-gray-900 text-start'>
            ₦ {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ItemFlex = ({ product }: { product: ItemTypes }) => {
  return (
    <Link key={product._id} href={`/item/${product._id}`}>
      <div className=' group space-y-2 cursor-pointer p-1 z-0'>
        <div className=' bg-black w-44 lg:w-56 h-36 lg:h-52 rounded-xl group-hover:opacity-75' />
        <p className='whitespace-nowrap text-sm lg:text-md text-center text-gray-700 mt-4 '>
          {limitText(product.title, 19)}
        </p>
        <p className=' text-xl font-medium text-gray-900 text-center'>
          ₦ {product.price}
        </p>
      </div>
    </Link>
  );
};
