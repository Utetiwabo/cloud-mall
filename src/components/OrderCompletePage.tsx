import { OrderCompletedType, OrderItemTypes } from "types/order";
import { dateTimeLocale, limitText } from "@lib/helpers";
import { TDivider, TFlex, THStack, TStack } from "./TElements";

const OrderItem = ({
  item,
  showD,
}: {
  item: OrderItemTypes;
  showD: boolean;
}) => {
  // console.log(indx);

  return (
    <>
      <THStack>
        <div>
          <div className='w-24 lg:w-32 h-24 lg:h-32 bg-black rounded-lg' />
        </div>
        <TStack className='flex-1'>
          <h1 className='text-sm'>{limitText(item.title, 20)}</h1>
          <p className='text-base'>{limitText(item.description, 20)}</p>
          <THStack className='justify-between'>
            <p>₦ {item.price}</p>
            <TFlex className='bg-gray-300 rounded-lg overflow-hidden'>
              <p className='bg-green-500 text-white px-2 py-1'>
                {item.quantity}
              </p>
              <p className='px-2 py-1'>₦ {item.quantity * item.price}</p>
            </TFlex>
          </THStack>
        </TStack>
      </THStack>
      {showD && <TDivider />}
    </>
  );
};

const OrderCompletePage = ({ data }: { data: OrderCompletedType }) => {
  const dateTime = new Date(data?.dateTime);

  return (
    <div className='bg-white w-full h-full'>
      <TStack
        space='space-y-5'
        className='pt-24 pb-5 max-w-screen-md mx-auto px-3 bg-white w-full h-full'>
        <TStack className='w-full'>
          <h1
            className='my-4 text-gray-700 font-bold bg-clip-text text-transparent bg-gradient-to-r
         from-green-600 to-red-500 text-2xl  text-center'>
            Thank you for your order
          </h1>
          <p>
            Order id:{" "}
            <span style={{ fontWeight: 600, fontSize: "20px" }}>
              {data?.orderId}
            </span>
          </p>
          <p>
            Time Placed:{" "}
            <span style={{ fontWeight: 500 }}>{dateTimeLocale(dateTime)}</span>
          </p>

          <p className='my-4'>
            {`
          An email will be sent to ${data?.shipping_details?.email} with your order
          confirmation and receipt`}
          </p>
          <p>Billing address</p>
          <p>{data?.shipping_details?.address}</p>
          <p>{data?.shipping_details?.phone}</p>
          {/* <Heading>Payment Method</Heading> */}
        </TStack>

        <TStack
          space='space-y-3'
          className='bg-white py-2 px-3 rounded-2xl shadow-md border border-[#CFD3D9]'>
          {data &&
            data.items.map((item, indx) => {
              const showD = !(indx + 1 === data.items.length);
              return <OrderItem key={item._id} item={item} showD={showD} />;
            })}
          {/* <OrderItem /> */}
        </TStack>

        <TStack
          space='space-y-1'
          className='p-4 shadow-lg border border-[#CFD3D9] rounded-2xl'>
          <h1 className='font-semibold'> Order Summary</h1>
          <TDivider />
          <p>
            Subtotal: <span>₦ 205,000</span>
          </p>
          <p>
            Delivery: <span>₦ 5,000</span>
          </p>

          <h1 className=''>
            Total: <span>{data?.total}</span>
          </h1>
        </TStack>
      </TStack>
    </div>
  );
};

export default OrderCompletePage;
