import CartItem from "src/components/CartItem";
import Layout from "@components/layouts/Layout";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ItemsGrid from "@components/ItemsGrid";
import { TButton, TDivider, TFlex, TStack } from "src/components/TElements";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import sum from "lodash/sum";
import { LoadingBlur } from "src/components/Loading";
import { useStore } from "store/store";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSSR } from "@components/Hooks";

// const CartItem = dynamic(() => import("src/components/CartItem"), {
//   ssr: false,
// });

const Cart = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const customer = user ? user : { uid: "customer" };
  const cart = useStore((state) => state.cart);
  const incrementCartQ = useStore((state) => state.incrementCartQ);
  const decrementCartQ = useStore((state) => state.decrementCartQ);
  const removeOne = useStore((state) => state.removeItemFromCart);
  const removeAll = useStore((state) => state.removeAll);
  const addOrder = useStore((state) => state.addOrderItems);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);

  const checked = (id: string) => selected.includes(id);

  const handleSelected = (id: string) => {
    !loading && setLoading(true);
    const idInCart = cart.find((item) => id === item._id)?._id;
    const updatedSelection = selected.includes(id)
      ? selected.filter((itemId) => id !== itemId)
      : !!idInCart
      ? [...selected, idInCart]
      : selected;
    setTimeout(() => {
      setSelected(updatedSelection);
      setLoading(false);
    }, 300);
  };

  const handleQuantityChange = (
    type: "increment" | "decrement",
    id: string
  ) => {
    setLoading(true);
    setTimeout(() => {
      type === "increment"
        ? incrementCartQ(id)
        : type === "decrement" && decrementCartQ(id);
      setLoading(false);
    }, 200);
  };

  const selectedItems = cart.filter((itemId) => selected.includes(itemId._id));

  const subTotal = sum(selectedItems.map((item) => item.price * item.quantity));

  const removeItem = (id: string) => {
    setSelected((old) => old.filter((itemId) => itemId !== id));
    removeOne(id);
  };

  const limit = 10;

  const hydrated = useSSR();
  const cartSSR = !hydrated ? [] : cart;

  return (
    <Layout>
      <>
        {loading && <LoadingBlur />}
        <TStack className='max-w-6xl w-full lg:flex-row lg:space-x-5 '>
          <div
            className={`bg-white shadow-sm border border-[#CFD3D9] w-full rounded-2xl p-2 lg:w-10/12 ${
              cartSSR?.length < 1 && "opacity-40"
            }`}>
            <TFlex className='items-center px-2 py-1'>
              <button
                aria-label='check-all'
                className={`bg-red-500 p-1 rounded-xl disabled:opacity-50 stroke-white shadow-sm text-white ${""}`}
                disabled={!(cart.length > 1)}
                onClick={() =>
                  cart.length === selected.length
                    ? setSelected([])
                    : setSelected(cart.map((item) => item._id))
                }>
                <CheckIcon width={25} />
              </button>
              <p className='flex-1 text-center text-2xl'>Cart</p>
              <button
                // className=''
                aria-label='delete-all-cart'
                disabled={!!(checked?.length < 1)}
                onClick={async () => {
                  removeAll();
                }}>
                <TrashIcon width={25} />
              </button>
            </TFlex>
            {cartSSR.length < 1 && (
              <p className='text-2xl text-center pt-5'>cart empty</p>
            )}
            {cartSSR.map((item) => (
              <CartItem
                handleQuantityChange={handleQuantityChange}
                removeItem={() => removeItem(item._id)}
                checked={checked(item._id)}
                handleChange={() => handleSelected(item._id)}
                key={item._id}
                item={item}
              />
            ))}
          </div>

          {/* cart summary */}

          <TStack
            className={`w-full lg:w-1/3 rounded-2xl p-3 shadow-sm h-fit bg-white border border-[#CFD3D9] ${
              selected.length < 1 && "opacity-50"
            }`}>
            <p className='text-xl text-center'>Cart summary</p>
            <TDivider />
            <TFlex className='justify-between'>
              <p>SubTotal</p>
              <p className='text-2xl'>
                <span style={{ textDecoration: "line-through" }}>N</span>
                {subTotal}
              </p>
            </TFlex>
            <TFlex className='justify-between'>
              <p className='text-xl'>Items</p>
              {selected?.length > 0 && (
                <p className='text-2xl'>{selected?.length}</p>
              )}
            </TFlex>
            <TDivider className='' />
            <button
              className='bg-black disabled:opacity-75 text-white rounded-xl px-3 py-2'
              disabled={selected.length < 1}
              onClick={() => {
                //TODO store.dispatch(getLatestItemsData(selected));
                addOrder(selectedItems);
                router.push("/checkout");
              }}>
              Checkout
            </button>
          </TStack>
        </TStack>
        <div className='pt-10 pb-4 w-full'>
          <p className='text-3xl text-center py-2'>More items to love</p>
          <ItemsGrid limit={limit} initialItems={[]} />
        </div>
      </>
    </Layout>
  );
};

export default Cart;
