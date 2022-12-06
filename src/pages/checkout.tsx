import { TFlex, TGrid, THStack } from "src/components/TElements";
import OrderReview from "src/components/OrderReview";
import PlaceOrderArea from "src/components/PlaceOrderArea";
import { User } from "firebase/auth";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderCompletedType } from "types/order";
import axios, { AxiosError } from "axios";
import { nanoid } from "nanoid";
import { Formik, useFormik } from "formik";
import { shippingDetailsValidationSchema } from "@lib/validationSchemas";
import { ShippingDetails } from "types/types";
import ShippingDetailsArea from "src/components/ShippingDetailsArea";
import { UserData } from "types/customer";
import { LoadingBlur } from "src/components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase";

const Checkout = ({ user }: { user: User }) => {
  interface PlaceOrderRes {
    customerId: string;
    paymentRes: { status: string; link: string };
    orderIds: { qid: string; oid: string };
  }
  const router = useRouter();

  const signInOnOpen = useStore((state) => state.openAuthModal);
  const persistGuest = useStore((state) => state.persistGuest);
  const order = useStore((state) => state.order);
  const guest = useStore((state) => state.guest);

  const customerId = user ? user?.uid : guest?.uid || "guest";

  const {
    data: userdata,
    isLoading: loadingData,
    status,
  } = useQuery<UserData>(["user", { query: { customerId } }], {
    enabled: !!customerId,
    networkMode: "offlineFirst",
  });

  const [sdt, setSDT] = useState("default");

  const selectedShippingDetails = userdata?.shippingDetails?.find(
    (details) => details.tag === sdt
  );

  const { mutate: placeOrder } = useMutation<
    PlaceOrderRes,
    AxiosError,
    ShippingDetails
  >(
    async (shipping_details) => {
      const { data } = await axios.post("/api/place-order", {
        order_payload: { ...order, shipping_details },
        customerId,
      });
      return data;
    },
    {
      networkMode: "online",
      onSuccess: (data) => {
        console.log(data);
        if (!user || data.customerId !== user.uid)
          persistGuest(data.customerId);
        if (data.paymentRes.status === "success") {
          router.replace(data.paymentRes.link);
        }
      },
    }
  );

  const formikInitialValues = {
    firstName: userdata?.firstName || "",
    lastName: userdata?.lastName || "",
    phone: selectedShippingDetails?.phone || "",
    email: selectedShippingDetails?.email || "",
    location: selectedShippingDetails?.location || "",
    state: selectedShippingDetails?.location || "",
    address: selectedShippingDetails?.address || "",
    notes: "",
  };

  if (loadingData) return <LoadingBlur />;

  return (
    <>
      <div className='top-0 left-0 right-0 fixed '>
        <h1 className='w-full text-center bg-black p-1 text-white text-2xl'>
          checkout
        </h1>

        <TFlex className='px-3 w-full justify-between items-center bg-black bg-opacity-60 backdrop-blur-sm'>
          {!user && (
            <TFlex>
              <p className='mx-2'>Returning Customer?</p>
              <button
                className='underline text-base text-white '
                onClick={() => signInOnOpen()}>
                login
              </button>
            </TFlex>
          )}

          <TFlex className='items-center mx-auto p-1'>
            <h2 className='rounded-full font-semibold text-lg bg-white w-7 justify-center inline-flex'>
              1
            </h2>
            <div className='w-5 bg-white bg-opacity-30 h-1' />
            <h2
              className='rounded-full font-semibold text-lg text-white bg-white bg-opacity-30 w-7
             justify-center inline-flex'>
              2
            </h2>
          </TFlex>
        </TFlex>
      </div>
      <Formik
        initialValues={formikInitialValues}
        onSubmit={(values) => placeOrder(values)}
        validationSchema={shippingDetailsValidationSchema}>
        {({ getFieldProps, submitForm, touched, errors, dirty }) => (
          <div className='bg-white w-full h-full'>
            <div className='w-fit mx-auto pb-5'>
              <TGrid className='px-3 mt-24 w-full gap-3 grid-cols-6 lg:grid-rows-5'>
                {/* <button ref={saveRef} style={{ display: "none" }} /> */}

                <div className='col-span-6 lg:col-span-4 lg:row-span-5'>
                  <ShippingDetailsArea
                    dirty={dirty}
                    selectAddress={setSDT}
                    userdata={userdata}
                    formikFieldProps={{
                      getFieldProps: getFieldProps,
                      errors: errors,
                      touched: touched,
                    }}
                    user={user}
                  />

                  <OrderReview subTotal={order.subTotal} items={order.items} />
                </div>

                <PlaceOrderArea
                  placeOrderFn={submitForm}
                  subTotal={order.subTotal}
                  items={order.items}
                />
              </TGrid>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Checkout;
