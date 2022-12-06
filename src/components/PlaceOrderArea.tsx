import { MutableRefObject, useEffect, useState } from "react";
import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { OrderItemTypes } from "types/order";
import { useRouter } from "next/router";
import { TButton, TDivider, TFlex, THStack, TStack } from "./TElements";
// import VerveCardSvg from "../public/verve.svg";
import Image from "next/image";
import RadioGroup from "src/r-components/RadioGroup";
import { useStore } from "store/store";
import VerveCardSvg from "public/verve.svg";
import MasterCardSvg from "public/mastercard.svg";
import VisaCardSvg from "public/visa2.svg";
import NairaSymbolSvg from "public/naira-symbol.svg";
import BankTransferSvg from "public/banktransfer.svg";

interface PlaceOrderAreaProps {
  placeOrderFn: () => void;
  subTotal: number;
  items: OrderItemTypes[];
}

const PlaceOrderArea = ({
  subTotal,
  items,
  placeOrderFn,
}: PlaceOrderAreaProps) => {
  const router = useRouter();

  const total = useStore((state) => state.order.total);
  const shipping_option = useStore((state) => state.order.shipping_option);
  const method = useStore((state) => state.order.payment.method);
  const setPaymentMethod = useStore((state) => state.setPaymentMethod);
  const setShippingOption = useStore((state) => state.setShippingOption);
  const paymentMethod = useStore((state) => state.order.payment.method);

  return (
    <>
      <TStack
        space={`space-y-3`}
        className='col-span-6 lg:col-span-2 border border-bordergray rounded-2xl shadow-md 
        bg-white h-fit lg:row-span-5 p-3'>
        <div>
          <h1 className='text-center text-2xl'>Order</h1>
          <TDivider />
        </div>
        <h2 className='text-base'>Payment Methods</h2>
        <RadioGroup
          value={paymentMethod}
          items={[
            { value: "card", display: "Card" },
            { value: "bank-transfer", display: "Bank Transfer" },
          ]}
          defaultValue='card'
          onValueChange={(selected) => setPaymentMethod(selected)}
        />

        {method === "card" ? (
          <div className='rounded-xl relative bg-black overflow-hidden h-32'>
            <TFlex className=' justify-center flex-1 items-center h-full'>
              <VerveCardSvg width={70} height={70} />
              <MasterCardSvg width={100} height={100} className='mx-2' />
              <VisaCardSvg
                width={50}
                height={50}
                className='fill-white text-blue-900'
              />
            </TFlex>
            <THStack
              className='text-white absolute bottom-0 text-sm w-full justify-center mx-auto bg-neutral-400 bg-opacity-20
             p-0.5'>
              <LockClosedIcon width={15} color='orange' />
              <p>powered by flutterwave</p>
            </THStack>
          </div>
        ) : (
          <THStack className='justify-center items-center border border-neutral-400 rounded-xl h-32'>
            <NairaSymbolSvg />
            <BankTransferSvg width={60} height={60} />
          </THStack>
        )}

        <h2 className='text-base'>Shipping</h2>
        <RadioGroup
          items={[
            { value: "pickup", display: "Pick Up" },
            { value: "home-delivery", display: "Home Delivery" },
          ]}
          defaultValue='home-delivery'
          onValueChange={(selected: "home-delivery" | "pickup") =>
            setShippingOption(selected)
          }
        />

        <TStack className='px-2'>
          <h2 className='text-base'>Order Summary</h2>
          <THStack className=''>
            <p>Item(s) -</p>
            <p>{items.length}</p>
          </THStack>
          <THStack className=''>
            <p>SubTotal -</p>
            <p>{subTotal}</p>
          </THStack>
          {shipping_option.price > 0 && (
            <THStack className=''>
              <p>Shipping -</p>
              <p>{shipping_option.price}</p>
            </THStack>
          )}

          <THStack className=''>
            <h1 className='text-xl font-semibold'>Total -</h1>
            <h1 className='text-xl font-semibold'>{total}</h1>
          </THStack>
        </TStack>
        <TButton
          // disabled={disabled}
          variant='ghost'
          className='bg-black rounded-xl hover:opacity-90 p-2 text-white'
          onClick={placeOrderFn}>
          Place Order
        </TButton>
      </TStack>
    </>
  );
};

export default PlaceOrderArea;
