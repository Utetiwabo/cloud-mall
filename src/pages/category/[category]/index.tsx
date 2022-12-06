import { useRouter } from "next/router";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import clientPromise from "@lib/mongo";
import { ItemTypes, PagePaintType, StoreType } from "types/types";
import Layout from "@components/layouts/Layout";
import { Loading } from "src/components/Loading";
import { useState } from "react";
import ItemsFlex from "src/components/ItemsFlex";
import { TFlex, TGrid, TStack } from "src/components/TElements";

const Category: NextPage = ({
  stores,
  deals,
  subCategories,
  pagePaint,
  subCategoriesWithItems,
}: {
  deals: ItemTypes[];
  subCategories: any[];
  pagePaint: PagePaintType;
  subCategoriesWithItems: any;
  stores: StoreType[];
}) => {
  const router = useRouter();
  // const [sort, setSort] = useState("popular");

  // console.log(subCategoriesWithItems);

  // console.log(stores);

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        <div className='bg-black p-2 mx-3 self-start text-white  w-fit rounded-lg'>
          <h2 className='text-2xl'>
            {subCategories ? subCategories[0].parent : router.query.category}
          </h2>
        </div>

        <TStack className='text-center w-full p-1'>
          <h2 className='text-center text-base'>Official Stores</h2>
          <TStack className='lg:flex-row w-full px-5 justify-center'>
            {stores.map((store) => (
              <TStack
                key={store._id}
                className='justify-bewtween rounded-xl h-72 bg-white p-5 shadow-sm w-full md:w-1/2'>
                <h2 className='text-3xl'>{store.name}</h2>
                <div className='text-3xl text-center'>LOGO</div>
                <p>{store?.about.slice(0, 100)}...</p>
              </TStack>
            ))}
          </TStack>
        </TStack>

        <TStack className='items-center w-full p-1'>
          <h2 className='text-center'>Top Brands</h2>
          <TGrid className='grid-cols-6 w-full md:w-auto gap-2 '>
            {pagePaint.brands.map((brand: string) => (
              <div
                key={brand}
                className='flex flex-col items-center justify-center  col-span-2 h-32 md:h-56 p-1 rounded-md font-semibold bg-white w-full md:w-40 cursor-pointer'
                onClick={() => router.push(`/brand/${brand.toLowerCase()}`)}>
                {brand}
              </div>
            ))}
          </TGrid>
        </TStack>

        <TStack className='max-w-screen-lg w-full mx-auto items-center'>
          <h2>Deals</h2>
          <ItemsFlex items={deals} />
        </TStack>

        <div className='w-full'>{/* <CatList /> */}</div>

        {subCategoriesWithItems.map((subCWI) => (
          <div key={subCWI.subC._id} className='py-2 w-full'>
            <TFlex className='mb-2 p-2 justify-between bg-white rounded-md max-w-screen-lg'>
              <h2 className='md:flex-1 ml-2 md:ml-20 md:text-center'>
                {subCWI.subC.category}
              </h2>
              <button className='text-red-500'>See All</button>
            </TFlex>

            <ItemsFlex items={subCWI?.items} />
          </div>
        ))}
      </>
    </Layout>
  );
};

export default Category;

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parent = context.params?.category;

  const pagePaint = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("pages")
    .findOne({ path: `category/${parent}` });

  const stores = await (await clientPromise)
    .db("the-mall")
    .collection("stores")
    .find({ fields: parent })
    .toArray();

  const categories = await (await clientPromise)
    .db("the-mall")
    .collection("categories")
    .find({ level: 1 })
    .toArray();

  const subCategories = await (await clientPromise)
    .db("the-mall")
    .collection("categories")
    .find({ parent })
    .toArray();

  let subCategoriesWithItems: any[] = [];

  for (const subC of subCategories) {
    const items = await (await clientPromise)
      .db("the-mall")
      .collection("items")
      .find()
      .limit(4)
      .toArray();
    subCategoriesWithItems.push({ subC: subC, items });
  }

  // console.log(subCategoriesWithItems);

  const deals = await (await clientPromise)
    .db("the-mall")
    .collection("items")
    .find()
    .limit(10)
    .toArray();
  return {
    props: {
      stores: JSON.parse(JSON.stringify(stores)),
      deals: JSON.parse(JSON.stringify(deals)),
      pagePaint: JSON.parse(JSON.stringify(pagePaint)),
      categories: JSON.parse(JSON.stringify(categories)),
      subCategoriesWithItems: JSON.parse(
        JSON.stringify(subCategoriesWithItems)
      ),
    },
  };
};
