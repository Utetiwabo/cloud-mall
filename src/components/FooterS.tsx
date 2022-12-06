import { StoreType } from "types/types";
import { TFlex, THStack, TStack } from "./TElements";
import FacebookIcon from "public/facebook.svg";
import InstagramIcon from "public/instagram.svg";
import TwitterIcon from "public/twitter.svg";

const FooterS = ({ store }: { store?: StoreType }) => {
  // console.log(store)
  return (
    <div className='w-full bg-maingray '>
      <div className='w-full max-w-screen-2xl mx-auto pb-2 md:pb-4 lg:pb-14 text-gray-200'>
        <div className='w-full px-5 py-10 flex-wrap'>
          <p className='whitespace-nowrap font-semibold text-2xl'>
            {store?.name || "Cloud Mall"}
          </p>
          <TFlex className='mx-4'>
            <a className='m-1'>
              <TwitterIcon w={30} color='white' />
            </a>
            <a className='m-1'>
              <InstagramIcon w={30} color='white' />
            </a>
            <a className='m-1'>
              <FacebookIcon w={30} color='white' />
            </a>
          </TFlex>

          <TFlex className='w-full justify-evenly'>
            <div>
              <p className='text-center font-semibold'>#</p>
              <p className='text-center'>Great Value</p>
              <p className='text-center'>lorel ipsum lorel ipsum</p>
            </div>
            <div>
              <p className='text-center font-semibold'>#</p>
              <p className='text-center'>Great Value</p>
              <p className='text-center'>lorel ipsum lorel ipsum</p>
            </div>
            <div>
              <p className='text-center font-semibold'>#</p>
              <p className='text-center'>Great Value</p>
              <p className='text-center'>lorel ipsum lorel ipsum</p>
            </div>
            <div>
              <p className='text-center font-semibold'>#</p>
              <p className='text-center'>Great Value</p>
              <p className='text-center'>lorel ipsum lorel ipsum</p>
            </div>
          </TFlex>
        </div>

        <TStack className='lg:flex-row items-center px-8'>
          <div className='p-2'>
            <p className='font-semibold'>Help</p>
            <THStack>
              <p className='text-[12px]'>Help Center</p>
              <p className='text-[12px]'>Delivery</p>
              <p className='text-[12px]'>Report a product</p>
            </THStack>
          </div>

          <div className='p-2'>
            <p className='font-semibold'>themall</p>
            <THStack>
              <p className='text-[12px]'>About us</p>
              <p className='text-[12px]'>Iot and tutorials</p>
              <p className='text-[12px]'>Bulk Purchases</p>
              <p className='text-[12px]'>Other services</p>
            </THStack>
          </div>

          <div className='p-2'>
            <p className='font-semibold'>Join us</p>
            <THStack>
              <p className='text-[12px]'>Become a vendor</p>
              <p className='text-[12px]'>Content creation</p>
              <p className='text-[12px]'>Tutorials</p>
              <p className='text-[12px]'>{"We're hiring"}</p>
            </THStack>
          </div>
        </TStack>
      </div>
    </div>
  );
};

export default FooterS;
