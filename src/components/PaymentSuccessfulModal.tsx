import * as Dialog from "@radix-ui/react-dialog/dist";
// import { CartCheckSvg, DeliverySvg, DeliveryVanSvg } from "./Svgs";
import CartCheckSvg from "public/cart-checkout.svg";
import DeliverySvg from "public/delivery-cart.svg";
import DeliveryVanSvg from "public/delivery-van.svg";

const PaymentSuccessfulModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='z-40 inset-0 fixed' />
        <Dialog.Content
          className='pointer-events-auto fixed w-screen z-50 overflow-hidden bottom-0
         bg-[#a9a9a9] justify-center items-center flex h-screen'>
          <div className='md:flex md:items-center'>
            <DeliverySvg
              className='svvg2'
              width={100}
              height={100}
              viewBox='0 0 290.624 290.624'
            />
            <CartCheckSvg
              className='svvg1 mx-10'
              width={250}
              height={250}
              viewBox='0 0 32 32'
            />
            <DeliveryVanSvg
              className='svvg3'
              width={100}
              height={100}
              viewBox='0 0 406.783 406.783'
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PaymentSuccessfulModal;
