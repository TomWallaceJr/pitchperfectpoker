/**
 * This is the Home page of a Next.js application that uses WordPress as a headless CMS.
 * It fetches posts from WordPress via the REST API and displays them on the page.
 * Each post is represented by a PostCard component. The page is designed to showcase
 * the power and flexibility of combining Next.js with headless WordPress for content management.
 *
 * - Head component sets the page's title.
 * - The main section contains a welcoming headline and a brief description.
 * - A list of posts fetched from WordPress is displayed as cards in a responsive grid layout.
 * - The Footer component is displayed at the bottom of the page.
 */

import Head from "next/head";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

export default function Home({ data }) {
  // Debugging logs to help understand the structure of fetched data
  console.log(data);
  console.log(data[0].title);

  return (
    <div className='min-h-screen bg-coolGray-50 text-gray-800'>
      <Head>
        {/* Page title set for SEO and browser tab */}
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='py-20'>
        {/* Hero section with a large title and subtitle */}
        <section className='text-center mb-20'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Headless WordPress Next.js Starter {data[0].title.rendered}
          </h1>
          <p className='mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Kickstart your next project with the power of headless CMS.
          </p>
        </section>

        {/* Posts section displaying each post as a card in a responsive grid */}
        <section className='flex flex-wrap justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {data.map((post) => (
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

// Fetches post data from WordPress REST API on the server side before page load
export async function getServerSideProps(context) {
  // Fetches the list of posts from WordPress REST API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts`
  );
  const data = await res.json();

  // If there is no data, return a 404 page
  if (!data) {
    return {
      notFound: true,
    };
  }

  // Pass the fetched data to the page via props
  return {
    props: {
      data,
    },
  };
}
