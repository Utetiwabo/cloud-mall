import { useRouter } from "next/router";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import axios from "axios";
import clientPromise from "@lib/mongo";
import { ItemTypes } from "types/types";
import Layout from "@components/layouts/Layout";
import { Loading } from "src/components/Loading";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { THStack, TStack } from "src/components/TElements";
import Link from "next/link";
import ItemsGrid from "src/components/ItemsGrid";

const SubCategory: NextPage = ({ items }: { items: ItemTypes[] }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Layout>
      <TStack className='w-full max-w-screen-lg'>
        <THStack className=' p-1 w-fit rounded-lg'>
          <Link href='/categories' className='text-base text-neutral-500'>
            Categories
          </Link>
          <Link
            href={`/${router.query?.category?.toString() || "categories"}`}
            className='text-base text-neutral-500'>
            / {router.query.category}
          </Link>
          <p className='text-base text-black'>/ {router.query.subCategory}</p>
        </THStack>

        <div className='w-full'>{/* <CatList /> */}</div>

        <ItemsGrid limit={10} initialItems={[]} />
      </TStack>
    </Layout>
  );
};

export default SubCategory;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const parent = context.params?.category;

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

  const items = await (await clientPromise)
    .db("the-mall")
    .collection("items")
    .find()
    .toArray();
  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
};
