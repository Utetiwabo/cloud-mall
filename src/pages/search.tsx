import Layout from "@components/layouts/Layout";
import { GetServerSideProps } from "next";
import clientPromise from "@lib/mongo";

const Search = ({
  matchedItems,
  relatedItems,
}: {
  matchedItems: any[];
  relatedItems: any[];
}) => {
  // console.log(matchedItems);
  return (
    <Layout>
      <div className='h-full'>search page</div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title, search } = context.query;

  const matchedItems = await (
    await clientPromise
  )
    .db("the-mall")
    .collection("items")
    .find({
      $or: [
        { title: new RegExp(search?.toString() || "", "i") },
        { description: new RegExp(search?.toString() || "", "i") },
        { brand: new RegExp(search?.toString() || "", "i") },
      ],
    })
    .toArray();

  return {
    props: {
      matchedItems: JSON.parse(JSON.stringify(matchedItems)),
      relatedItems: [],
    },
  };
};
