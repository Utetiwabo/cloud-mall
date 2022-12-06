import axios from "axios";
import debounce from "lodash/debounce";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ItemTypes, StoreType } from "types/types";
import { TFlex } from "./TElements";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const SearchPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const popUpRef = useRef<HTMLInputElement>(null);

  // useOutsideClick({
  //   ref: popUpRef,
  //   handler: () => setShow(null),
  // });

  const [{ itemHits, search }, setSearchData] = useState<{
    itemHits: ItemTypes[];
    storeHits: StoreType[];
    search: string;
  }>({ itemHits: [], search: "", storeHits: [] });

  // const [show, setShow] = useState(null);

  // useEffect(() => {
  //   itemHits.length > 0 && setShow(true);
  // }, [itemHits]);

  // console.log(itemHits);

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target?.value;
    if (input.length > 0) {
      try {
        const { data } = await axios.get("/api/search", {
          params: { hint: input },
        });
        setSearchData(data);
      } catch (err) {
        console.log(err);
      }
    }
  }, 800);

  return (
    <div className='hidden lg:flex relative h-10 items-center'>
      <div className='relative h-9 items-center ml-7 w-full'>
        <button className='absolute left-1 h-full inline-flex items-center'>
          <MagnifyingGlassIcon color='red' width={25} />
        </button>
        <input
          className='pl-9 pr-36 h-full w-full rounded-lg outline-none bg-white'
          onChange={handleSearch}
          onFocus={() => {
            // ref.current.style.width = "500px";
            popUpRef.current?.style?.display &&
              (popUpRef.current.style.display = "block");
          }}
          // onBlur={() => {
          //   itemHits.length < 1 && (ref.current.style.width = "384px");
          // }}
        />
        <button
          className='absolute right-0 top-0 bottom-0 rounded-r-lg px-2 inline-flex items-center
         bg-red-500 text-white '>
          <p>categories</p>
          <ChevronDownIcon width={20} />
        </button>
      </div>

      <button className='bg-black h-9 ml-3 px-3 my-1 text-base rounded-lg text-white'>
        Search
      </button>

      {itemHits.length > 0 && (
        <div className='absolute left-0 right-0 top-12'>
          <div
            ref={popUpRef}
            className='relative w-4/5 rounded-xl shadow-lg py-4 px-1 mx-auto bg-white border
           border-bordergray overflow-hidden'>
            <button
              className='absolute top-1 right-5'
              onClick={() => {
                // ref.current.style.width = "auto";
                if (popUpRef.current) popUpRef.current.style.display = "none";
                // setSearchData({ itemHits: [], search: "", storeHits: [] });
              }}>
              <XMarkIcon width={35} className='text-gray-400' />
            </button>
            <div
              className={`my-1 overflow-y-auto max-h-[500px] ${
                itemHits.length > 0 ? "block" : "hidden"
              } `}>
              {itemHits.map((hit) => (
                <Link
                  key={hit._id}
                  href={{
                    pathname: `/search`,
                    query: { title: hit.title, search },
                  }}
                  className='cursor-pointer py-2 px-5 hover:bg-[whitesmoke]'>
                  <p>{hit.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
