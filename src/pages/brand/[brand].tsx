import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import clientPromise from "@lib/mongo";

const Brands = () => {
  const router = useRouter();
  return (
    <div className='rounded-md bg-white w-full md:w-1/2 mt-10'>
      <h2 className='mx-auto text-lg w-fit'>
        {router.query?.brand}
      </h2>
    </div>
  );
};

export default Brands;

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await (await clientPromise)
    .db("the-mall")
    .collection("items")
    .find()
    .limit(10)
    .toArray();
  return { props: { items: JSON.parse(JSON.stringify(items)) } };
};
