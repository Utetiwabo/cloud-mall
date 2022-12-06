import ItemsFlex from "@components/ItemsFlex";
import ItemsGrid from "@components/ItemsGrid";
import LayoutS from "@components/layouts/LayoutSFilter";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import clientPromise from "@lib/mongo";
import { ItemTypes, StoreType } from "types/types";
import Slide from "src/components/Slide";
import { TGrid, TStack } from "src/components/TElements";

const Category: NextPage = ({
  store,
}: // featured,
{
  store: StoreType;
  // featured: any;
}) => {
  const router = useRouter();

  const focused = store?.categories?.find(
    (category) =>
      router.query?.category?.toString() === category.category.toLowerCase()
  );

  return (
    <LayoutS store={store}>
      <>
        {focused && (
          <TGrid className='grid-cols-3 md:grid-flow-col auto-cols-fr pt-10 w-full md:w-9/12 gap-2'>
            {focused?.subCategories?.length > 0 &&
              focused.subCategories.map((cat) => (
                <div key={cat.category} className='rounded-2xl bg-white p-1'>
                  <div>
                    <div className='w-full rounded-2xl h-20 md:h-24 lg:h-32 bg-black' />
                  </div>
                  <p className='text-center text-base'>{cat.category}</p>
                </div>
              ))}
          </TGrid>
        )}

        <TStack className='w-full max-w-xl'>
          <ItemsGrid limit={10} initialItems={[]} />
        </TStack>
      </>
    </LayoutS>
  );
};

export default Category;

// Category.getLayout = function getLayout(page: ReactElement) {
//   return <LayoutS>{page}</LayoutS>;
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.params?.store?.toString();
  const category = context.params?.category?.toString();
  const sort = context.query?.sort?.toString();

  const store = await (await clientPromise)
    .db("the-mall")
    .collection("stores")
    .findOne({ uniqueName: host });

  // const items = await (await clientPromise)
  //   .db("the-mall")
  //   .collection("items")
  //   .find()
  //   .sort({ price: -1 })
  //   .limit(3)
  //   .toArray();

  // console.log(items);

  // const featured = await (await clientPromise)
  //   .db("the-mall")
  //   .collection("items")
  //   .find({ deal: true })
  //   .toArray();

  return {
    props: {
      store: JSON.parse(JSON.stringify(store)),
      // featured: JSON.parse(JSON.stringify(featured)),
    },
  };
};
