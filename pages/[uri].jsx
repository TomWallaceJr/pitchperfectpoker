// This component renders a detailed view of a single post fetched from a headless WordPress setup using its slug.
// It displays the post's title, publication date, and content. If the post is not found, it shows a "Post not found" message.

import Head from "next/head";
import Footer from "../components/Footer";
// Assuming `getPostByUri` is a function to fetch post data by its URI (slug).
import { getPostByUri } from "../lib/test-data";

export default function SlugPage({ post }) {
  // Early return for when a post is not found, displaying a simple message.
  if (!post) return <div>Post not found</div>;

  // Console logs for debugging purposes, to inspect the structure of the fetched post.
  console.log(post);
  console.log(post.author);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Head>
        {/* Sets the page title to a generic value. Ideally, this should be dynamic based on the post's title. */}
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='max-w-4xl mx-auto p-4 md:p-8'>
        <div className='mb-8 text-center'>
          {/* Renders the post title in a large, bold font. */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            {post.title.rendered}
          </h1>
          {/* Displays the post's publication date formatted as a local date string. */}
          <p className='text-md md:text-lg text-gray-600'>
            🗓️&nbsp;{new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        {/* Article content is rendered here, using `dangerouslySetInnerHTML` to parse the HTML content returned by WordPress. */}
        <article className='prose lg:prose-xl mx-auto text-gray-800'>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      </main>

      <Footer />
    </div>
  );
}

// `getStaticProps` fetches the post data from the WordPress REST API based on the slug passed via the page URL.
export async function getStaticProps({ params }) {
  // Fetches the post using the WordPress REST API and the slug from the URL.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${params.uri}`
  );
  const posts = await res.json();

  // Since the REST API returns an array, we take the first item, assuming slugs are unique.
  const post = posts.length > 0 ? posts[0] : null;

  // If no post is found, Next.js will render a 404 page.
  if (!post) {
    return { notFound: true };
  }

  // Returns the fetched post as props to the component, enabling server-side rendering.
  return {
    props: {
      post,
    },
    // Enables Incremental Static Regeneration, allowing the page to be updated at most once every 10 seconds.
    revalidate: 10,
  };
}

// `getStaticPaths` pre-defines the paths to be statically generated at build time based on available posts.
export async function getStaticPaths() {
  // Fetches all available post slugs to generate static paths for them.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=slug`
  );
  const posts = await res.json();

  // Maps fetched posts to an array of path objects required by Next.js.
  const paths = posts.map((post) => ({
    params: { uri: post.slug },
  }));

  // Specifies which paths to pre-render and sets fallback behavior.
  return {
    paths,
    fallback: "blocking", // Ensures new paths not generated at build time are server-side rendered.
  };
}
