import ItemsGrid from "src/components/ItemsGrid";
import Layout from "@components/layouts/Layout";
import clientPromise from "@lib/mongo";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { BlogTypes, ItemTypes, PagePaintType, StoreType } from "types/types";
import slide1 from "public/arduino3.jpg";
import slide2 from "public/arduino55.jpg";
import slide3 from "public/rasb.jpg";
import MiddleDisplay from "@components/MiddleDisplay";
import { Loading } from "@components/Loading";
import { User } from "firebase/auth";
import ItemsFlex from "@components/ItemsFlex";
import LayoutS from "@components/layouts/LayoutS";
import { TButton, TFlex, TStack } from "src/components/TElements";
import PaymentSuccessfulModal from "src/components/PaymentSuccessfulModal";

const Store = ({
  featured,
  pagePaint,
  store,
  user,
  otherCategories,
  blogs,
}: {
  featured: ItemTypes[];
  pagePaint?: PagePaintType;
  store?: StoreType;
  otherCategories: any;
  user: User;
  blogs: BlogTypes[];
}) => {
  const router = useRouter();

  const images = pagePaint?.images;

  const displayBlog = blogs.find((blog) => blog.article?.id === "1");
  const OtherBlogs = blogs
    .filter((blog) => blog.article?.id !== "1")
    .slice(0, 4);

  if (router.isFallback) return <Loading />;

  if (!pagePaint || !store || !blogs)
    return (
      <div className='flex flex-col justify-center items-center h-full'>
        <p className='text-2xl'>
          404 | <span className='text-sm'>the page could not be found</span>{" "}
        </p>
      </div>
    );

  return (
    <LayoutS
      user={user}
      store={store}
      searchBarText={"search " + router.query?.store?.toString() || ""}>
      <>
        <div className='flex justify-center w-full max-w-screen-2xl mx-auto'>
          <MiddleDisplay
            slides={images}
            slidesImgs={{ slide1, slide2, slide3 }}
          />
        </div>

        {/* <PaymentSuccessfulModal open={true} setOpen={() => {}} /> */}

        {/* <Checkbox value='goat' checked={checked} handleChange={handleChange} /> */}

        {/* <TButton variant='solid' className='text-lg shadow-md '>
          Click the BUtton
        </TButton> */}
        {/* <Modal /> */}
        <div className='space-y-5 w-full px-2'>
          {/* <CategoryList category={[]} /> */}
          <div className='flex space-x-3 justify-center h-28 lg:h-52'>
            <div className='flex justify-center items-center rounded-2xl bg-white w-48 md:w-96'>
              card 1
            </div>
            <div className='flex justify-center items-center rounded-2xl bg-white w-48 md:w-96'>
              card 2
            </div>
          </div>
          {/* custom display product */}
          <ItemsFlexWTitle heading='Featured Items' items={featured} />
          <ItemsFlexWTitle heading='Top Deals' items={featured} />
          <ItemsFlexWTitle heading='Budget Items' items={featured} />
          <ItemsFlexWTitle heading='More to Love' items={featured} />
        </div>
        <div className='flex flex-col bg-white items-center p-2 my-3 w-full'>
          <p className='font-semibold'>{displayBlog?.article?.title}</p>
          <button className='hover:underline'>{`View ${
            store?.blogs?.name || "Blog"
          }`}</button>
          {/* <Box maxW='1140px' w='full'> */}
          <div className='flex flex-col p-1 lg:flex-row w-full'>
            <div className='flex flex-col p-2 lg:flex-row'>
              <div className='w-full h-60'>
                <div className='rounded-xl bg-black w-full h-full' />
              </div>
              <p className='p-3'>{displayBlog?.article.body1}</p>
            </div>
            <div className=' w-full'>
              <ItemsFlex items={featured.slice(0, 3)} />
            </div>
          </div>

          {/* more items for blog... */}
          <p className='font-sm font-semibold pt-10'>More</p>
          <div className='grid gap-4 lg:grid-cols-4 my-4 w-full'>
            {OtherBlogs?.map((blog) => (
              <div
                key={blog._id}
                className='flex justify-center items-center text-xl p-2 bg-black text-white cursor-pointer h-16 lg:h-36 rounded-2xl '>
                {blog.article.title}
              </div>
            ))}
          </div>
          <TButton className=''>View All</TButton>
        </div>

        {/* store about */}
        <div className='p-2'>
          <div className='rounded-xl p-4 w-full md:w-10/12 lg:w-2/4 space-y-4 bg-white '>
            <p className='text-center font-semibold'>{store.description}</p>
            {/* </HStack> */}
            <p>{store.about}</p>
            <h1 className=' text-3xl'>{store.name}</h1>
          </div>
        </div>

        {/* personalized section */}
        <div className='pb-20 space-y-4 w-full px-2'>
          <p className='text-xl text-center font-medium lg:text-2xl'>
            These Items May Also Interest You
          </p>
          <ItemsFlexWTitle heading='Freshest Deals' items={featured} />
          <ItemsFlexWTitle heading='From other Stores' items={featured} />
          <p className='text-zinc-500 text-center pt-10 text-2xl'>
            Browse Other Collections
          </p>

          <div className='space-y-3 lg:grid grid-cols-3 auto-rows-max gap-2 lg:space-y-0'>
            {otherCategories.map((category: any) => (
              <TStack
                key={category._id}
                className='bg-white p-2 rounded-2xl h-20 justify-center'>
                <p className='text-center text-2xl'>{category.category}</p>
              </TStack>
            ))}
          </div>
        </div>
      </>
    </LayoutS>
  );
};

export default Store;

const ItemsFlexWTitle = ({
  heading,
  onClickMore,
  items,
}: {
  heading: string;
  onClickMore?: () => void;
  items: ItemTypes[];
}) => {
  return (
    <div className='max-w-7xl mx-auto bg-white rounded-xl p-2 '>
      <TFlex className='justify-between p-2'>
        <p className='font-medium text-md'>{heading}</p>
        <button className='hover:underline text-md ' onClick={onClickMore}>
          See All Items
        </button>
      </TFlex>
      <ItemsFlex items={items} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.params?.store?.toString();

  const store = await (await clientPromise)
    .db("the-mall")
    .collection("stores")
    .findOne({ uniqueName: host });

  const pagePaint = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("pages")
    .findOne({
      $and: [{ host }, { path: "/" }],
    });
  // console.log(pagePaint);

  const featured = await (await clientPromise)
    .db("the-mall")
    .collection("items")
    .find({})
    .limit(5)
    .toArray();

  const otherCategories = await (await clientPromise)
    .db("the-mall")
    .collection("categories")
    .find({ level: 1 })
    .toArray();

  const blogs = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("pages")
    .find({ $and: [{ host }, { class: "blog" }] })
    .toArray();

  return {
    props: {
      featured: JSON.parse(JSON.stringify(featured)),
      pagePaint: JSON.parse(JSON.stringify(pagePaint)),
      store: JSON.parse(JSON.stringify(store)),
      otherCategories: JSON.parse(JSON.stringify(otherCategories)),
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
};
