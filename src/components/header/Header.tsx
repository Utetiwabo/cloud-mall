import {
  Bars2Icon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import SearchPage from "../SearchPage";
import SearchPageMob from "../SearchPageMob";
import { StoreLogo, Logo } from "../Logo";
import { TFlex, TIconButton } from "../TElements";
import Collapse from "@r-components/Collapse";
import Avatar from "@r-components/Avatar";
import { useStore } from "store/store";
import { useDisclosure, useSSR } from "../Hooks";
import NavList from "./NavListMob";
import { StoreType } from "types/types";
import dynamic from "next/dynamic";

interface HeaderProps {
  children: ReactNode;
  user: User | null | undefined;
  loadingUser?: boolean;
  categoryList?: any[];
  store?: StoreType;
}

const Header = ({
  loadingUser,
  children,
  user,
  categoryList,
  store,
}: HeaderProps) => {
  const router = useRouter();
  const [isOpen, { toggle }] = useDisclosure();

  const cartLNoSSR = useStore((state) => state.cart.length);
  const hydrated = useSSR();
  const cartL = !hydrated ? 0 : cartLNoSSR;

  const openAuthModal = useStore((state) => state.openAuthModal);

  // console.log("first");

  return (
    <div className='bg-maingray relative w-full p-1'>
      <TFlex className=' items-center max-w-screen-2xl  mx-auto justify-between '>
        <button className=' lg:hidden text-white ml-2' onClick={toggle}>
          <Bars2Icon stroke='white' width={25} />
        </button>
        <div className='lg:hidden' />
        <TFlex className='lg:ml-10'>
          {router.query.store ? <StoreLogo /> : <Logo />} <SearchPage />
        </TFlex>

        <TFlex className='items-center space-x-1 lg:space-x-2 lg:pr-3'>
          <Link
            href='/cart'
            className='rounded-xl relative p-1 bg-white'
            aria-label='cart'>
            <ShoppingCartIcon color='#000000' width={25} />

            <p className='absolute right-0 top-0 text-sm font-semibold bg-[red] rounded-full text-white text-[14px] px-1.5 text-center cursor-pointer'>
              {cartL > 0 && cartL}
            </p>
          </Link>

          <Link
            href='/account'
            className='rounded-lg hidden lg:inline-flex bg-white p-1.5'
            aria-label='saved-items'>
            <HeartIcon width={20} />
          </Link>

          <button
            className='group inline-flex items-center'
            // alignContent='center'
            onClick={() => {
              user ? router.push("/account") : openAuthModal();
            }}>
            <Avatar
              className='w-9 h-9 rounded-2xl mx-1'
              fallback={user?.displayName || undefined}
            />
            <p className='group-hover:scale-125 pl-1 text-sm hidden lg:block text-white'>
              {user ? user?.displayName?.split(" ")[0] : "SignIn"}
            </p>
          </button>

          <Link href='/help' className='hidden lg:inline-block'>
            help
          </Link>
        </TFlex>
      </TFlex>
      {/* sm screen search bar */}
      <div className='lg:hidden w-full px-1'>
        <Collapse open={isOpen}>
          <NavList user={user} categories={categoryList} store={store} />
        </Collapse>
        {children}
      </div>
    </div>
  );
};

export default Header;
