import NavListMob from "@components/header/NavListMob";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";
import Header from "../header/Header";
import Footer from "src/components/Footer";
import TopHeader from "@components/TopHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase";
import { StoreType } from "types/types";
import { TStack } from "@components/TElements";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const SearchPageMob = dynamic(() => import("../SearchPageMob"));
const Layout = ({
  children,
  categories,
  user,
  loadingUser,
}: {
  children: ReactElement;
  categories?: any;
  user?: User | null;
  loadingUser?: boolean;
}) => {
  const router = useRouter();

  const [searchPage, setsearchPage] = useState(false);

  return (
    <>
      {searchPage && (
        <SearchPageMob search={searchPage} setSearch={setsearchPage} />
      )}
      <div className='w-full z-10 top-0 fixed justify-center '>
        <TopHeader />
        <Header loadingUser={loadingUser} user={user}>
          <button
            className='bg-white w-full inline-flex mt-2 justify-center items-center py-1  rounded-lg cursor-text hover:opacity-95'
            onClick={() => setsearchPage(true)}>
            <MagnifyingGlassIcon color='red' width={25} />
            <p className='px-2 text-maingray text-[18px] opacity-50'>
              search products...
            </p>
          </button>
        </Header>
      </div>

      <TStack className='mt-24 p-2 md:mt-28 lg:mt-24 max-w-screen-2xl mx-auto w-full items-center'>
        {children}
      </TStack>
      <Footer />
    </>
  );
};

export default Layout;
