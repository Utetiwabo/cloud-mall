import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import Layout from "@components/layouts/Layout";
import clientPromise from "@lib/mongo";
import { ObjectId } from "mongodb";
import { ItemTypes } from "types/types";
import { useState } from "react";
import { User } from "firebase/auth";
import { Loading } from "src/components/Loading";
import {
  TButton,
  TDivider,
  TFlex,
  THStack,
  TStack,
} from "src/components/TElements";
import Toast, { useToastTrigger } from "src/r-components/Toast";
import {
  MinusIcon,
  PlusIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useStore } from "store/store";

const Item: NextPage = ({ item, user }: { item: ItemTypes; user: User }) => {
  const router = useRouter();
  const addOrder = useStore((state) => state.addOrderItems);
  const addToCart = useStore((state) => state.addItemToCart);
  // const customer = user ? user : { uid: "customer" };

  const [quantity, setQuantity] = useState(1);

  const { open, setOpen, trigger } = useToastTrigger();

  const orderItem = {
    _id: item?._id,
    title: item?.title,
    description: item?.description,
    shortDescription: item?.shortDescription,
    price: item?.price,
    // rating: number,
    brand: item?.brand,
    thumbnail: item?.thumbnail,
    vendor: item?.vendor,
    discountPercentage: item?.discountPercentage,
    quantity: quantity,
  };

  // const cart = useSelector((state: RootState) => state.cart.items);

  const itemId = router.query.item;

  // const x = useStore((state) => state.cart);
  // console.log(x);

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Layout>
      {/* <Button size='lg' variant='solid' onClick={() => router.push("/")}>
        home
      </Button> */}
      <>
        <Toast
          title='Added To Cart'
          description={item.title}
          duration={2000}
          open={open}
          setOpen={setOpen}
        />
        <TStack className='pt-2 lg:flex-row w-full max-w-6xl'>
          <div className='lg:w-[700px] space-y-3 py-3'>
            <div className='rounded-3xl h-[400px] bg-neutral-900 shadow-sm w-full' />
            <div className='rounded-3xl h-[100px] bg-neutral-900 shadow-sm w-full' />
          </div>
          <TFlex className='flex-col lg:flex-row ml-4 w-full'>
            <div className='w-full'>
              <p className='text-2xl'>{item.title}</p>
              <p className='text-sm text-green-700'>Available</p>
              <THStack className='items-center'>
                <StarIcon
                  width={10}
                  color={item.rating >= 1 ? "orange" : "transparent"}
                  stroke='gray'
                />
                <StarIcon
                  width={10}
                  color={item.rating >= 2 ? "orange" : "transparent"}
                  stroke='gray'
                />
                <StarIcon
                  width={10}
                  color={item.rating >= 3 ? "orange" : "transparent"}
                  stroke='gray'
                />
                <StarIcon
                  width={10}
                  color={item.rating >= 4 ? "orange" : "transparent"}
                  stroke='gray'
                />
                <StarIcon
                  width={10}
                  color={item.rating >= 5 ? "orange" : "transparent"}
                  stroke='gray'
                />
                <p className='text-sm'>{item.rating}</p>
              </THStack>
              <p className='text-sm'>
                {item.stock}
                <span>orders</span>
              </p>
              <TDivider className='my-3' />
              <p className='text-3xl '>
                <span className='line-through'>N</span>
                {item.price}
              </p>

              <TDivider />

              <THStack className='py-10'>
                <button
                  className='bg-neutral-900 rounded-xl h-7 w-8 text-white'
                  onClick={() => setQuantity(quantity - 1)}>
                  <MinusIcon width={24} />
                </button>
                <p className='text-2xl text-center w-6'>{quantity}</p>
                <button
                  className='bg-neutral-900 rounded-xl h-7 w-8 text-white'
                  onClick={() => setQuantity(quantity + 1)}>
                  <PlusIcon width={24} stroke='white' />
                </button>
              </THStack>

              <THStack>
                <button
                  className='text-white bg-black rounded-xl text-xl py-3 px-6 shadow-sm hover:opacity-60'
                  onClick={() => {
                    addOrder([orderItem]);
                    router.push("/checkout");
                  }}>
                  Buy Now
                </button>
                <button
                  className='bg-white rounded-xl text-xl p-3 shadow-sm hover:opacity-60'
                  onClick={() => {
                    // const inCart = !!cart.find(
                    //   (itemInCart) => itemInCart._id === item._id
                    // );
                    addToCart(orderItem);
                    trigger();
                  }}>
                  Add to Cart
                </button>
              </THStack>
            </div>

            <div className='bg-white rounded-2xl space-y-1 my-5 mx-auto p-3 h-fit whitespace-nowrap'>
              <p className='text-center text-xl font-semibold '>
                {item.brand.toLowerCase()}
              </p>
              <TDivider />
              <p className='text-base'>#{item.category}</p>
              <TDivider />
              <THStack>
                <TButton className='w-full'>
                  <HeartIcon className='mx-1' />
                  <p> save</p>
                </TButton>
                <TButton className='w-full'>share</TButton>
              </THStack>
            </div>
          </TFlex>
        </TStack>
      </>
    </Layout>
  );
};

export default Item;

// Item.getLayout = function getLayout(page: any) {
//   return <Layout>{page}</Layout>;
// };

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const item = ObjectId.isValid(context.params.item.toString())
  const item = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("items")
    .findOne(
      { _id: new ObjectId(context?.params?.item?.toString()) },
      { projection: { published: 0, sold: 0, dateAdded: 0 } }
    );
  // : { undefined };

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
    },
  };
};
