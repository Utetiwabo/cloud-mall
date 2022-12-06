import { OrderItemTypes } from "types/order";
import { limitText } from "@lib/helpers";
import { TDivider, TFlex, THStack, TStack } from "./TElements";

const OrderReview = ({
  subTotal,
  items,
}: {
  subTotal: number;
  items: OrderItemTypes[];
}) => {
  if (items.length < 1)
    return <p className='text-center py-3'>no item to checkout</p>;
  return (
    <TStack className='mt-5 bg-white border border-bordergray rounded-2xl p-2 shadow-md'>
      <h2 className='text-center text-xl font-semibold'>Order Review</h2>
      <TDivider />
      {items &&
        items.map((item) => (
          <THStack className='justify-evenly px-2' key={item._id}>
            <div>
              <div className='w-20 h-20 md:w-32 md:h-32 bg-black rounded-xl' />
            </div>
            <div className='flex-1'>
              <h2 className='text-sm md:text-lg'>
                {limitText(item.title, 20)}
              </h2>
              <p className='md:text-xl'>{limitText(item.description, 30)}</p>
              <THStack className='justify-between'>
                <p className='text-xl md:text-2xl'>N{item.price}</p>
                <TFlex className='text-semibold text-gray-700 shadow-sm border border-bordergray rounded-lg overflow-hidden'>
                  <p className='bg-blue-500 text-white px-2'>{item.quantity}</p>
                  <p className='text-lg px-2'>N{item.quantity * item.price}</p>
                </TFlex>
              </THStack>
            </div>
          </THStack>
        ))}
    </TStack>
  );
};

export default OrderReview;
