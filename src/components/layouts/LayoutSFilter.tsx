import { ReactElement, ReactNode, useState } from "react";
import { auth } from "@lib/firebase";
import TopHeader from "@components/TopHeader";
import slide1 from "public/arduino4.jpg";
import { StoreType } from "types/types";
import Footer from "src/components/Footer";
import Header from "../header/Header";
import { TStack } from "@components/TElements";
import SortFilter from "@components/header/SortFilter";
import dynamic from "next/dynamic";

const FilterDrawer = dynamic(
  () => import("src/components/header/FilterDrawer"),
  {
    // ssr: true,
  }
);

const LayoutSFilter = ({
  children,
  store,
}: // sortState,
{
  children: ReactElement;
  store?: StoreType;
  // sortState: any;
}) => {
  const user = auth.currentUser;

  const [fdOpen, setFDOpen] = useState(false);

  return (
    <>
      <FilterDrawer open={fdOpen} setOpen={setFDOpen} />
      <div className='w-full z-30 fixed justify-center '>
        <TopHeader />
        <Header user={user} store={store}>
          <SortFilter envr='store' setOpen={setFDOpen} />
        </Header>
      </div>
      <TStack className='pt-20 px-2 md:pt-28 lg:pt-14 max-w-screen-2xl mx-auto w-full items-center'>
        {children}
      </TStack>
      <Footer />
    </>
  );
};

export default LayoutSFilter;
