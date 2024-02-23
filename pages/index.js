import Head from "next/head";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/test-data";
import { client } from "@/lib/api";
import { gql } from "@apollo/client";

export default function Home({ data }) {
  console.log(data);
  console.log(data[0].title);
  return (
    <div className='min-h-screen bg-coolGray-50 text-gray-800'>
      <Head>
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='py-20'>
        <section className='text-center mb-20'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Headless WordPress Next.js Starter {data[0].title.rendered}
          </h1>
          <p className='mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Kickstart your next project with the power of headless CMS.
          </p>
        </section>

        <section className='flex flex-wrap justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {data.map((post) => (
            <div key={post.uri} className='p-4 w-full md:w-1/2 lg:w-1/2'>
              <PostCard post={post} />
              {/* <h1>{post.title.rendered}</h1> */}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}
