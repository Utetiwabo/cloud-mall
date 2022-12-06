import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ItemTypes } from "types/types";
import { OrderItemTypes } from "types/order";
import { limitText } from "@lib/helpers";
import {
  TButton,
  TDivider,
  TFlex,
  THStack,
  TIconButton,
  TStack,
} from "./TElements";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon as Trash2Icon } from "@heroicons/react/24/outline";

const CartItem = ({
  item,
  checked,
  handleChange,
  removeItem,
  handleQuantityChange,
}: {
  item: OrderItemTypes;
  checked: boolean;
  handleChange: () => void;
  removeItem: () => void;
  handleQuantityChange: (type: "increment" | "decrement", id: string) => void;
}) => {
  // const { data, status } = useQuery<OrderItemTypes>([`items/${item._id}`]);

  // const latestItem = data || item;

  // console.log(status);

  // useEffect(() => {
  //   if (
  //     latestItem &&
  //     (latestItem.price !== item.price || latestItem.title !== item.title)
  //   ) {
  //     console.log("to dispatch");
  //     dispatch(updateMetas(latestItem));
  //   }
  // }, [latestItem, dispatch, item]);

  return (
    <>
      <TDivider />
      {item && (
        <THStack
          space='space-x-2'
          className='items-center py-2 lg:space-x-5 w-full'
          key={item._id}>
          <Checkbox checked={checked} handleChange={handleChange} />
          <div>
            <div className='w-24 lg:w-40 h-24 lg:h-40 bg-black rounded-2xl' />
          </div>

          <div className='w-full '>
            <p className='whitespace-nowrap text-sm'>
              {limitText(item.title, 20)}
            </p>

            <TFlex className='w-full '>
              <div className='flex-1'>
                <p className='font-semibold whitespace-nowrap text-xl my-1'>
                  <span style={{ textDecoration: "line-through" }}>N</span>{" "}
                  {item.price}
                </p>

                <p>Noobyte</p>
                <p className='whitespace-nowrap text-[12px] text-blue-400 '>
                  more from this store
                </p>
              </div>

              <TStack className='items-center mr-3'>
                <button aria-label='delete-item-from-cart' onClick={removeItem}>
                  <Trash2Icon width={20} />
                </button>

                <THStack className='lg:w-20 justify-between '>
                  <button
                    className='bg-black px-1 rounded-xl text-white'
                    aria-label='decreament-item'
                    disabled={item.quantity < 2}
                    onClick={() => {
                      handleQuantityChange("decrement", item._id);
                    }}>
                    <MinusIcon width={20} stroke='white' />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className='bg-black px-1 rounded-xl text-white'
                    aria-label='decreament-item'
                    disabled={item.quantity > 19}
                    onClick={() => {
                      handleQuantityChange("increment", item._id);
                    }}>
                    <PlusIcon width={20} stroke='white' />
                  </button>
                </THStack>
              </TStack>
            </TFlex>
          </div>
        </THStack>
      )}

      {/* </Flex> */}
    </>
  );
};

export const Checkbox = ({
  checked,
  handleChange,
}: {
  checked: boolean;
  handleChange: () => void;
}) => {
  return (
    <div className=''>
      <button
        type='button'
        onClick={handleChange}
        className={`rounded-lg  cursor-pointer group hover:bg-red-400 grow flex w-[25px] h-[25px] items-center justify-center shadow-md text-white ${
          checked ? "bg-red-500" : "bg-gray-200"
        }`}>
        {checked && <CheckIcon width={"100%"} />}
      </button>
    </div>
  );
};

export default CartItem;
