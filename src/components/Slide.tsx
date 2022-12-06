import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusCircleIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import * as RadioGroup from "@radix-ui/react-radio-group/dist";
import debounce from "lodash/debounce";
import { useState } from "react";

const DialogDemo = () => {
  const [value, setValue] = useState("mango");

  // console.log(value);

  return (
    <>
      {/* <button className='Button violet' onClick={() => setOpen(true)}>
        Edit profile
      </button> */}
      <RadioGroup.Root
        className='flex flex-col gap-4'
        defaultValue='card'
        aria-label='View density'>
        <div className='flex items-center'>
          <RadioGroup.Item
            className='w-9 h-9 rounded-2xl shadow-md border border-bordergray shadow-neutral-200 bg-white'
            value='card'
            id='r1'>
            <RadioGroup.Indicator
              className='flex relative w-full h-full p-1 items-center justify-center
             after:bg-black after:w-full after:h-full after:rounded-2xl after:block'
            />
          </RadioGroup.Item>
          <label className='mx-2 text-xl' htmlFor='r1'>
            Card
          </label>
        </div>
        <div className='flex items-center'>
          <RadioGroup.Item
            className='w-9 h-9 rounded-2xl shadow-md border border-bordergray shadow-neutral-200 bg-white'
            value='bank-transfer'
            id='r1'>
            <RadioGroup.Indicator
              className='flex relative w-full h-full p-1 items-center justify-center
             after:bg-black after:w-full after:h-full after:rounded-2xl after:block'
            />
          </RadioGroup.Item>
          <label className='mx-2 text-xl' htmlFor='r1'>
            Bank Transfer
          </label>
        </div>
      </RadioGroup.Root>
    </>
  );
};

export default DialogDemo;
