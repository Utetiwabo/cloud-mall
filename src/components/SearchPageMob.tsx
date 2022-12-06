import {
  ChevronLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from "lodash/debounce";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { ItemTypes, StoreType } from "types/types";
import { TFlex, THStack, TStack } from "./TElements";

const SearchPageMob = ({
  search,
  setSearch,
}: // setSearchData,
{
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
  // setSearchData: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchData, setSearchData] = useState<{
    itemHits: ItemTypes[];
    storeHits: StoreType[];
    search: string;
  }>({
    itemHits: [],
    storeHits: [],
    search: "",
  });

  // console.log(searchData.itemHits);

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
  }, 500);

  return (
    <div className='fixed z-50 inset-0 w-full bg-white'>
      <THStack className='items-center p-2 border-b w-full border-b-bordergray '>
        <button
          className='text-gray-500 stroke-gray-500'
          aria-label=''
          onClick={() => setSearch(false)}>
          <ChevronLeftIcon width={25} />
        </button>
        <div className='w-full relative'>
          <input
            ref={inputRef}
            className='pr-10 w-full'
            placeholder='search in products, brands...'
            autoFocus
            // bgColor='whitesmoke'
            // rounded='xl'
            onChange={handleSearch}
          />
          <TFlex className='h-full absolute right-0 top-0'>
            <button
              className='bg-gray-300 rounded-full h-5 w-5 inline-flex items-center justify-center mx-2'
              aria-label='cancel-search'
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
              }}>
              <XMarkIcon width={15} />
            </button>
          </TFlex>
        </div>
        <button
          aria-label='search'
          className='text-red-500'
          onClick={() =>
            router.push({
              pathname: "/search",
              query: { search: searchData.search ?? inputRef?.current?.value },
            })
          }>
          <MagnifyingGlassIcon width={35} />
        </button>
      </THStack>
      {/* <Divider /> */}
      <TStack className='overflow-y-auto h-full'>
        {searchData.storeHits.slice(0, 3).map((store) => (
          <Link
            key={store._id}
            href={`/store/${store.name.replace(/\s+/g, "").toLowerCase()}/`}
            className='py-3 px-10 flex items-center hover:bg-orange-200'>
            <HomeIcon width={25} />
            <p className='ml-1 font-semibold text-xl'>{store.name}</p>
          </Link>
        ))}

        {searchData.itemHits.map((hit) => (
          <Link
            key={hit._id}
            href={{
              pathname: `/search`,
              query: { title: hit.title, search: searchData.search },
            }}
            className='flex items-center p-2 hover:bg-[whitesmoke]'>
            <p className='text-center w-full'>{hit.title}</p>
          </Link>
        ))}
      </TStack>
    </div>
  );
};

export default SearchPageMob;
