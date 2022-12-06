import { useRouter } from "next/router";
import { StoreType } from "types/types";
import { TFlex, TGrid, TStack } from "./TElements";

const StoresDisplay = ({ stores }: { stores: StoreType[] }) => {
  const router = useRouter();
  return (
    <TStack
      className='rounded-2xl p-2 col-span-12 md:col-span-4 md:row-span-2 h-full 
    row-start-2 w-full border bg-white shadow-md border-bordergray'>
      <TFlex className='justify-between border border-neutral-300 py-1 px-3 rounded-2xl'>
        <h2 className='text-xl m-1  '>Top Stores</h2>
        <button className='text-sm m-1'>more</button>
      </TFlex>
      <div className='flex w-full overflow-x-auto lg:overflow-hidden md:grid md:grid-cols-3 gap-2 h-full'>
        {stores.map((store) => (
          <div key={store._id}>
            <div
              key={store._id}
              className='PrettyScrollBar rounded-2xl border border-neutral-300 w-32 h-20 md:w-full md:h-full flex items-center justify-center cursor-pointer bg-white'
              onClick={() =>
                router.push(`/${store.name.replace(/\s+/g, "").toLowerCase()}/`)
              }>
              <p className='mx-auto'>{store.name}</p>
            </div>
          </div>
        ))}
      </div>
    </TStack>
  );
};

export default StoresDisplay;
