import { Loading } from "src/components/Loading";
import { User } from "firebase/auth";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "@lib/firebase";
import Saved from "src/components/Saved";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "types/customer";
import { TDivider, TFlex, TStack } from "src/components/TElements";
import Avatar from "src/r-components/Avatar";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useStore } from "store/store";

const Account: NextPage = ({ user }: { user: User }) => {
  // console.log(user);
  const router = useRouter();

  const openAuthModal = useStore((state) => state.openAuthModal);

  const { data: userdata } = useQuery<UserData>(
    ["user", { query: { customerId: user?.uid } }],
    {
      enabled: !!user,
    }
  );

  // if (!user) return <Loading />;

  return (
    <div className='w-full'>
      <div className='bg-black p-2 text-white w-full'>
        <>
          <TFlex className='justify-between p-2'>
            <Avatar
              alt='profille-img'
              className='w-24 h-24 rounded-2xl'
              fallback={`${userdata?.firstName} ${userdata?.lastName}`}
            />
            {/* {user && (
              <button
                className='bg-gray-500 px-2 h-10 rounded-xl'
                onClick={() => auth.signOut()}>
                Logout
              </button>
            )} */}
          </TFlex>
          {userdata ? (
            <h2 className='text-2xl lg:text-3xl font-semibold pt-3'>
              {userdata.firstName + " " + userdata.lastName}
            </h2>
          ) : (
            <button className='p-5 text-white ' onClick={openAuthModal}>
              Sign Up / Sign In
            </button>
          )}
        </>
      </div>

      <div className='px-1 pt-20'>
        <TStack className='max-w-xl mx-auto overflow-hidden rounded-lg'>
          <PageLink heading='Orders' to='/orders' />

          <TDivider className='border-gray-200' />

          {/* <PageLink heading='Profile' to='/profile' />
          <TDivider /> */}

          <PageLink heading='Saved' to='/orders' />
          <TDivider className='border-gray-200' />

          <PageLink heading='Profile/Settings' to='/account/settings' />
          <TDivider className='border-gray-200' />

          <div className='pt-10'>
            <PageLink heading='Help Center' to='/help' />
          </div>
        </TStack>
      </div>
    </div>
  );
};

const PageLink = ({ to, heading }: { to: string; heading: string }) => {
  return (
    <Link
      href={to}
      className='inline-flex justify-between w-full text-gray-800 px-2  text-xl'>
      <p>{heading}</p>
    </Link>
  );
};

export default Account;
