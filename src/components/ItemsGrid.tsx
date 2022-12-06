import { ItemGrid } from "src/components/Item";
import { Fragment, useEffect, useRef, useState } from "react";
import { ItemTypes } from "types/types";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Loading } from "./Loading";
import { cleanObject } from "@lib/helpers";
import { TGrid } from "./TElements";

const ItemsGrid = ({
  initialItems,
  limit,
}: {
  initialItems: ItemTypes[];
  limit: number;
}) => {
  const router = useRouter();

  const sort = router.query?.sort?.toString();
  const price = router.query?.price?.toString();

  // const [enabled, setEnabled] = useState(
  //   initialItems.length < 1 ? true : false
  // );

  const sortQuery = cleanObject({ sort, price });

  // console.log(sortQuery);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error,
    isInitialLoading,
    status,
  } = useInfiniteQuery<ItemTypes[]>({
    queryKey: ["infiniteItems", sortQuery],
    queryFn: async ({ pageParam = initialItems.length }) => {
      const { data } = await axios.get(`/api/items`, {
        params: {
          offset: pageParam,
          limit,
          ...sortQuery,
        },
      });
      return data;
    },
    getNextPageParam: (last, all) =>
      last.length < limit
        ? null
        : (all.length + initialItems.length / limit) * limit,
    // enabled,
  });

  const loaderArr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  if (isInitialLoading) return <Loading />;

  return (
    <div className='h-full w-full max-w-7xl mx-auto'>
      <TGrid className='my-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-4'>
        <>
          {initialItems &&
            initialItems.map((item) => {
              if (item && item !== null)
                return (
                  <div key={item._id} className='w-full'>
                    <ItemGrid product={item} />
                  </div>
                );
            })}
        </>
        <>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.map((item) => (
                <div key={item._id} className='w-full'>
                  <ItemGrid product={item} />
                </div>
              ))}
            </Fragment>
          ))}
        </>
      </TGrid>
      {!isFetching && !isFetchingNextPage && hasNextPage && (
        <InView
          onChange={(inView) => {
            if (inView) {
              //   if (!enabled) {
              //     setEnabled(true);
              //   } else fetchNextPage();
              fetchNextPage();
            }
          }}
        />
      )}
    </div>
  );
};

export default ItemsGrid;
