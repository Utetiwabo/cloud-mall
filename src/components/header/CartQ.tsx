import { useStore } from "store/store";

const CartQ = () => {
  const cartL = useStore((state) => state.cart.length);
  return (
    <p className='absolute right-0 top-0 text-sm font-semibold bg-[red] rounded-full text-white text-[14px] px-1.5 text-center cursor-pointer'>
      {cartL > 0 && cartL}
    </p>
  );
};

export default CartQ;
