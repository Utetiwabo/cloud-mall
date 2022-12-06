import { Loading } from "@components/Loading";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Payment_status = () => {
  const router = useRouter();
  const paymentStatus = router.query?.status?.toString();
  const txRef = router.query?.tx_ref?.toString();

  const {
    mutate: updateOrderStatus,
    data,
    isLoading,
  } = useMutation(
    async () => {
      const { data } = await axios.post("/api/orders/update-status", {
        txRef,
        status: paymentStatus,
      });
      return data;
    },
    { onSuccess: (data) => {} }
  );

  useEffect(() => {
    updateOrderStatus();
  }, [paymentStatus]);

  // console.log(data);

  if (isLoading || !txRef) return <Loading />;

  return (
    <>
      <div className='fixed inset-x-0 top-0 h-12 bg-black flex items-center '>
        <Link href='/' className='text-white text-xl inline-flex '>
          <ChevronLeftIcon width={25} />
          <p>continue shopping</p>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center bg-neutral-500 h-screen w-full'>
        {data && (
          <div className='text-white'>
            <h2 className='text-3xl'>
              payment <span>{data.status}</span>
            </h2>
            <p className='text-xl my-2'>
              tx_ref: <span>{data.txRef}</span>
            </p>
            <p className='text-xl '>
              amount: ₦ <span>{data.total}</span>
            </p>
            <p className='text-xl '>
              items: <span>{data.items?.length}</span>
            </p>
            <p className='text-xl '>
              payment method: <span>{data.payment.method}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment_status;
