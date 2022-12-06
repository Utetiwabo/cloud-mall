import { TFlex } from "./TElements";

const TopHeader = () => {
  return (
    <TFlex className='hidden lg:flex justify-evenly bg-black bg-opacity-80 backdrop-blur-sm w-full '>
      <p className='text-[13px] text-gray-500'>Register Store</p>
      <p className='text-[13px] text-gray-500'>Become a Vendor</p>
      <p className='text-[13px] text-gray-500'>Contact support</p>
    </TFlex>
  );
};

export default TopHeader;
