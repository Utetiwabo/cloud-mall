import MiddleDisplay from "src/components/main/MiddleDisplay";
import Display1 from "src/components/main/Display1";
import Stores from "src/components/StoresDisplay";
import CategoryList from "src/components/nav/CategoryList";
import ItemsGrid from "src/components/ItemsGrid";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Layout from "@components/layouts/Layout";
import { useRouter } from "next/router";
import clientPromise from "@lib/mongo";
import { ItemTypes, PagePaintType, StoreType } from "types/types";
import { Loading } from "src/components/Loading";
import slide1 from "public/bag.jpg";
import slide2 from "public/diy.jpg";
import slide3 from "public/drone.jpg";
import ItemsFlex from "src/components/ItemsFlex";
import { TGrid } from "src/components/TElements";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";

// const MiddleDisplay = dynamic(
//   () => import("src/components/main/MiddleDisplay"),
//   {
//     ssr: true,
//   }
// );

const Home = ({
  loadingUser,
  user,
  deals,
  initialItems,
  pagePaint,
  stores,
}: {
  deals: ItemTypes[];
  initialItems: { featured: ItemTypes[]; limit: number };
  pagePaint: PagePaintType;
  stores: StoreType[];
  loadingUser?: boolean;
  user?: User | null;
}) => {
  const { images, medias } = pagePaint;

  const { featured, limit } = initialItems;

  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Layout categories={[]} user={user} loadingUser={loadingUser}>
      <>
        <TGrid className='grid-cols-12 gap-2 w-full'>
          <CategoryList category={[]} />
          <Stores stores={stores} />
          <Display1 smSlide={medias} />
          <MiddleDisplay
            slides={images}
            slidesImgs={{ slide1, slide2, slide3 }}
          />
        </TGrid>

        <div className='w-full'>
          <ItemsFlex items={deals} />
        </div>
        <ItemsGrid initialItems={featured} limit={limit} />
      </>
    </Layout>
  );
};

export default Home;

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const limit: number = 7;
  const itemFields = { title: 1, category: 1, price: 1 };

  const categories = await (await clientPromise)
    .db("the-mall")
    .collection("categories")
    .find({ level: 1 })
    .toArray();

  const deals = await (await clientPromise)
    .db("the-mall")
    .collection("items")
    .find({ deal: true })
    .project(itemFields)
    .toArray();

  const featured = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("items")
    .find()
    .project(itemFields)
    .limit(limit * 2)
    .toArray();

  const pagePaint = await (await clientPromise)
    .db("the-mall")
    .collection("pages")
    .findOne({ path: "/" });

  const stores = await (await clientPromise)
    .db("the-mall")
    .collection("stores")
    .find()
    .toArray();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      deals: JSON.parse(JSON.stringify(deals)),
      initialItems: { featured: JSON.parse(JSON.stringify(featured)), limit },
      pagePaint: JSON.parse(JSON.stringify(pagePaint)),
      stores: JSON.parse(JSON.stringify(stores)),
    },
  };
};
