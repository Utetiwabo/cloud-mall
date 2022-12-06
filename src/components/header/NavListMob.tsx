import { User } from "firebase/auth";
import Link from "next/link";
import { auth } from "@lib/firebase";
import { TDivider, THStack } from "src/components/TElements";
import { useStore } from "store/store";
import { StoreType } from "types/types";

interface NavListProps {
  categories?: any;
  user: User | null | undefined;
  store?: StoreType;
}

const LinkListItem = ({ text, href }: { text: string; href: string }) => (
  <Link href={href}>
    <li className=''>{text}</li>
  </Link>
);

const NavList = ({ categories, user, store }: NavListProps) => {
  const openAuthModal = useStore((state) => state.openAuthModal);

  return (
    <THStack className='text-start flex md:hidden w-full pt-4'>
      <div className='w-full'>
        <h2 className='text-base text-white'>By Category</h2>
        <ul className='flex flex-col p-1 text-white'>
          {categories?.map((category: any, index: number) => (
            <LinkListItem
              key={index}
              href={`/category/${category.name}`}
              text={category.name}
            />
          ))}
          {store?.categories.map((cat) => (
            <LinkListItem
              key={cat.category}
              text={cat.category}
              href={`/${store.uniqueName}/${cat.category.toLowerCase()}`}
            />
          ))}
          <Link href='/categories'>See All</Link>
        </ul>
      </div>
      {/*...*/}
      <div className='w-full'>
        <h2 className='text-base text-white'>My Account</h2>
        <ul className='flex flex-col p-1 text-white'>
          {user ? (
            <Link href='/account'>{user?.displayName}</Link>
          ) : (
            <button className='text-[whitesmoke]' onClick={openAuthModal}>
              SignIn / Login
            </button>
          )}
          <LinkListItem href='/orders' text='Orders' />
          <LinkListItem text='Saved Items' href='/cart' />
          <LinkListItem text='Cart' href='/cart' />
        </ul>
        <TDivider />

        <ul className='flex flex-col p-1 text-white'>
          <LinkListItem text='Become a Vendor' href='/vendorAuth' />
          <LinkListItem text='Help Center' href='/help' />
        </ul>
      </div>
    </THStack>
  );
};

export default NavList;
