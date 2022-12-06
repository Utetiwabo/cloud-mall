import { TButton, TFlex, THStack, TIconButton } from "@components/TElements";
import {
  FunnelIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { cleanObject } from "@lib/helpers";
import Select from "@r-components/Select";
import { useRouter } from "next/router";
import { useState } from "react";

interface SortFilterProps {
  envr: "store" | "main";
  setOpen: (open: boolean) => void;
}

const SortFilter = ({ envr, setOpen }: SortFilterProps) => {
  const router = useRouter();

  const sort = router.query?.sort?.toString();
  const price = router.query?.price?.toString();

  const sortPathName =
    envr === "store"
      ? `/${router.query?.store?.toString()}/${router.query?.category?.toString()}`
      : `/${router.query?.store?.toString()}/${router.query?.category?.toString()}`;

  return (
    <TFlex className='w-full pt-3 text-white'>
      <TIconButton
        aria-label='search'
        className='bg-white ml-2 mr-3 rounded-xl p-1.5'
        variant='ghost'
        //   onClick={() => setSearch(true)}
      >
        <MagnifyingGlassIcon color='red' width={25} />
      </TIconButton>

      <TFlex className='justify-between w-full items-center pr-2 text-inherit'>
        <Select
          contentStyles='bg-[gray]'
          selectList={[
            { item: "Best Match", value: "best-match" },
            { item: "Price Up", value: "highest-price" },
            { item: "Price Down", value: "lowest-price" },
            { item: "Rating", value: "rating" },
          ]}
          defaultSelected='best-match'
          onValueChange={(value) =>
            router.query?.sort !== value &&
            router.replace(
              {
                pathname: sortPathName,
                query:
                  value === "best-match"
                    ? cleanObject({ price })
                    : cleanObject({ sort: value, price }),
              },
              undefined,
              { shallow: false }
            )
          }
        />
        {/* <Checkbox /> */}
        {/* <Slide /> */}

        <THStack>
          <TButton
            variant='ghost'
            className='bg-[gray] rounded-lg px-2 space-x-1 '
            onClick={() => setOpen(true)}>
            <FunnelIcon width={20} />
            <span>Filter</span>
          </TButton>

          <TIconButton
            className='bg-[gray] rounded-lg px-1'
            aria-label='grid-list'
            variant='ghost'
            onClick={() => {}}>
            {/* TODO make list / grid view */}
            {<ListBulletIcon width='30' stroke='white' color='white' />}
          </TIconButton>
        </THStack>
      </TFlex>
    </TFlex>
  );
};

export default SortFilter;
