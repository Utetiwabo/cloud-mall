import { ChevronLeftIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { User } from "firebase/auth";
import Head from "next/head";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderCompletedType } from "types/order";
import { dateLocale, limitText } from "@lib/helpers";
import { Loading } from "src/components/Loading";
import { TDivider, TFlex, THStack, TStack } from "src/components/TElements";
import { useRouter } from "next/router";

const Orders = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: orders, isLoading } = useQuery<OrderCompletedType[]>([
    "orders",
    { query: { customerId: user?.uid } },
  ]);

  // const orders: OrderCompletedType[] = data?.orders;

  if (isLoading) return <Loading />;

  return (
    <>
      <TFlex className='fixed justify-between bg-black top-0 left-0 right-0 p-2'>
        <button onClick={() => router.back()}>
          <ChevronLeftIcon width={25} color='white' stroke='white' />
        </button>
        <h1 className='text-2xl text-white'>My Orders</h1>
        <div />
      </TFlex>
      <TStack className='max-w-lg mx-auto px-3 mt-20 w-full'>
        <TFlex className='px-3 py-2 rounded-2xl items-center justify-between bg-white'>
          <h2 className='text-base'>date asc</h2>
          <p>All</p>
          <button
            aria-label='filter-orders'
            className='inline-flex items-center'>
            <p>filter</p> <FunnelIcon width={20} />
          </button>
        </TFlex>
        {orders.length < 1 ? (
          <h2 className='text-center'>No order yet</h2>
        ) : (
          <TStack className=''>
            {orders?.map((order) => (
              <TStack key={order.orderId} className='bg-white rounded-2xl p-3'>
                <TFlex className='justify-between text-base'>
                  <p className=''>{dateLocale(order.dateTime)}</p>
                  <p className=''>{order.status}</p>
                  <h2 className='text-lg'>N{order.total}</h2>
                </TFlex>
                <TDivider />
                {order.items.map((item, indx) => (
                  <Fragment key={item._id}>
                    <THStack>
                      <div>
                        <div className='w-20 md:w-28 h-20 md:h-28 rounded-xl bg-black' />
                      </div>
                      <TStack className='flex-1'>
                        <h1 className='text-sm'>{limitText(item.title, 20)}</h1>
                        <p className='text-base'>
                          {limitText(item.description, 20)}
                        </p>
                        <THStack className='justify-between'>
                          <p>N{item.price}</p>
                          <TFlex className='bg-gray-300 rounded-lg overflow-hidden'>
                            <p className='bg-black text-white px-2 py-1'>
                              {item.quantity}
                            </p>
                            <p className='px-2 py-1'>
                              N{item.quantity * item.price}
                            </p>
                          </TFlex>
                        </THStack>
                      </TStack>
                    </THStack>
                    {indx + 1 < order.items.length && <TDivider />}
                  </Fragment>
                ))}
                {/* {order.orderItems.length > 3 && (
                <Text textAlign='center' color='gray'>
                  and <span>{order.orderItems.length - 3}</span> more
                </Text>
              )} */}
                <TDivider />
                <TFlex className='justify-between'>
                  <h1 className='font-semibold text-base'>#{order.orderId}</h1>
                  <p className='text-base'>{order.payment.method}</p>
                  <THStack>
                    <p className='text-sm'>{order.shipping_option.type}</p>
                    <p className='text-sm'>N{order.shipping_option.price}</p>
                  </THStack>
                </TFlex>
              </TStack>
            ))}
          </TStack>
        )}
      </TStack>
    </>
  );
};

export default Orders;
