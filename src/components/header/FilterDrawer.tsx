import * as Slider from "@radix-ui/react-slider";
import * as Dialog from "@radix-ui/react-dialog/dist";
import { useReducer } from "react";
import { useRouter } from "next/router";
import { FilterType } from "types/types";
import { cleanObject } from "@lib/helpers";
import { filterDefaultState, filterReducer } from "@lib/reducers";
import { TFlex, THStack, TStack } from "../TElements";
import debounce from "lodash/debounce";

const FilterDrawer = ({ open, setOpen }) => {
  const router = useRouter();
  const sort = router.query?.sort?.toString();
  const price = router.query?.price?.toString();

  const initialState: FilterType = {
    prices: price
      ? [Number(price.split("-")[0]), Number(price.split("-")[1])]
      : [0, 10000],
  };

  const [filter, dispatch] = useReducer(filterReducer, initialState);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className=' bg-gray-800 opacity-60 z-40 inset-0 fixed' />

        <div className='fixed inset-0 z-50 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-x-0 bottom-0 flex w-full '>
              <Dialog.Content className='pointer-events-auto relative w-screen'>
                <div className='flex h-[500px] flex-col bg-white rounded-t-xl w-full pt-4 shadow-xl'>
                  <TFlex className='px-2'>
                    <button
                      className='mx-1 bg-[red] text-white w-full rounded-xl px-3 py-2 text-xl'
                      onClick={() => dispatch({ type: "reset" })}>
                      reset
                    </button>
                    <button
                      className='mx-1 bg-black text-white w-full rounded-xl px-3 py-2 text-xl'
                      onClick={() => {
                        router.replace(
                          {
                            pathname: `/${router.query?.store?.toString()}/${router.query?.category?.toString()}`,
                            query: cleanObject({
                              sort,
                              price:
                                filterDefaultState.prices.join("-") !==
                                filter.prices?.join("-")
                                  ? filter.prices?.join("-")
                                  : undefined,
                            }),
                          },
                          undefined,
                          { shallow: false }
                        );
                        setOpen(false);
                      }}>
                      show
                    </button>
                  </TFlex>
                  <TStack className='relative mt-6 flex-1 px-4 sm:px-6'>
                    {/* Replace with your content */}
                    <Slider.Root
                      onValueChange={debounce(
                        (val: number[]) =>
                          dispatch({ type: "prices", payload: val }),
                        300
                      )}
                      className='relative w-full flex items-center touch-none select-none'
                      defaultValue={initialState.prices}
                      max={10000}
                      step={1}
                      aria-label='Volume'>
                      <Slider.Track className='relative w-full rounded-full bg-black bg-opacity-50 h-1.5'>
                        <Slider.Range className='absolute h-full bg-red' />
                      </Slider.Track>
                      <Slider.Thumb className='block bg-maingray w-7 h-7 rounded-lg hover:bg-gray-500' />
                      <Slider.Thumb className='block bg-black w-7 h-7 rounded-lg  hover:bg-gray-700' />
                    </Slider.Root>
                    <THStack className='w-full'>
                      <div className='w-full'>
                        <p className='text-center'>min</p>
                        <input
                          className='rounded-xl w-full outline-none bg-gray-200 px-3 py-1'
                          value={filter.prices && filter.prices[0]}
                          type='number'
                          onChange={(e) => {
                            if (!filter.prices) return;
                            if (
                              Number(e.target.value) !== 0 ||
                              filter.prices[0] !== 0
                            )
                              dispatch({
                                type: "prices",
                                payload: [
                                  Number(e.target.value),
                                  filter.prices[1],
                                ],
                              });
                          }}
                          placeholder='min'
                        />
                      </div>
                      <div className='w-full'>
                        <p className='text-center'>max</p>
                        <input
                          className='rounded-xl w-full outline-none bg-gray-200 px-3 py-1'
                          type='number'
                          value={filter.prices && filter.prices[1]}
                          onChange={(e) => {
                            if (!filter.prices) return;
                            if (
                              Number(e.target.value) !== 0 ||
                              filter.prices[1] !== 0
                            )
                              dispatch({
                                type: "prices",
                                payload: [
                                  filter.prices[0],
                                  Number(e.target.value),
                                ],
                              });
                          }}
                          placeholder='max'
                        />
                      </div>
                    </THStack>
                    {/* /End replace */}
                  </TStack>
                </div>
              </Dialog.Content>
            </div>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FilterDrawer;
