import Head from "next/head";
import Footer from "../components/Footer";
import { getPostByUri } from "../lib/test-data";

export default function SlugPage({ post }) {
  if (!post) return <div>Post not found</div>;
  console.log(post);
  console.log(post.author);
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Head>
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='max-w-4xl mx-auto p-4 md:p-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            {post.title.rendered}
          </h1>
          <p className='text-md md:text-lg text-gray-600'>
            🗓️&nbsp;{new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <article className='prose lg:prose-xl mx-auto text-gray-800'>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${params.uri}`
  );
  const posts = await res.json();

  // Since the REST API returns an array, we take the first item
  const post = posts.length > 0 ? posts[0] : null;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, // Optional for Incremental Static Regeneration (ISR)
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=slug`
  );
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { uri: post.slug },
  }));

  return {
    paths,
    fallback: "blocking", // or false or true
  };
}
