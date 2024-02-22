import Head from "next/head";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/test-data";
import { client } from "@/lib/apollo";
import { gql } from "@apollo/client";

export default function Home({ posts }) {
  return (
    <div className='min-h-screen bg-coolGray-50 text-gray-800'>
      <Head>
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='py-20'>
        <section className='text-center mb-20'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Headless WordPress Next.js Starter
          </h1>
          <p className='mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Kickstart your next project with the power of headless CMS.
          </p>
        </section>

        <section className='flex flex-wrap justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {posts.map((post) => (
            <div key={post.uri} className='p-4 w-full md:w-1/2 lg:w-1/2'>
              <PostCard post={post} />
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          content
          uri
          date
        }
      }
    }
  `;

  try {
    const response = await client.query({
      query: GET_POSTS,
    });

    // Ensure posts are defined, even if the query returns null or undefined
    const posts = response?.data?.posts?.nodes ?? [];

    return {
      props: {
        posts,
      },
      // Optionally, add revalidate key to enable ISR (Incremental Static Regeneration) with a fallback time
      revalidate: 10, // In seconds
    };
  } catch (error) {
    console.error("Error fetching posts:", error);

    // Return an empty array for posts if there's an error
    return {
      props: {
        posts: [],
      },
    };
  }
}
