import { ReactElement, ReactNode, useState } from "react";
import Header from "../header/Header";
import TopHeader from "../TopHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase";
import { StoreType } from "types/types";
import NavListMobS from "../header/NavListMob";
import FooterS from "../FooterS";
import { TStack } from "../TElements";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchPageMob = dynamic(() => import("../SearchPageMob"));

const LayoutS = ({
  children,
  store,
  searchBarText,
  user,
}: {
  children: ReactElement;
  store?: StoreType;
  searchBarText: string;
  user: User | null | undefined;
}) => {
  const [searchPage, setsearchPage] = useState(false);

  return (
    <>
      {searchPage && (
        <SearchPageMob search={searchPage} setSearch={setsearchPage} />
      )}

      <div className='w-full z-10 fixed justify-center '>
        <TopHeader />
        <Header user={user} store={store}>
          <button
            className='bg-white w-full inline-flex mt-2 justify-center items-center py-1  rounded-lg cursor-text hover:opacity-95'
            onClick={() => setsearchPage(true)}>
            <MagnifyingGlassIcon color='red' width={25} />
            <p className='px-2 text-maingray text-[18px] opacity-50'>
              {searchBarText}
            </p>
          </button>
        </Header>
      </div>

      <TStack className='pt-20 md:pt-28 lg:pt-14 max-w-screen-2xl mx-auto w-full items-center'>
        {children}
      </TStack>
      <FooterS store={store} />
    </>
  );
};

export default LayoutS;
