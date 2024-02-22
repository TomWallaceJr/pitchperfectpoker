import Head from "next/head";
import Footer from "../components/Footer";
import { getPostByUri } from "../lib/test-data";

export default function SlugPage({ post }) {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Head>
        <title>Headless WP Next Starter</title>
      </Head>

      <main className='max-w-4xl mx-auto p-4 md:p-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            {post.title}
          </h1>
          <p className='text-md md:text-lg text-gray-600'>
            ✍️&nbsp;
            {`${post.author.node.firstName} ${post.author.node.lastName}`} |
            🗓️&nbsp;{new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <article className='prose lg:prose-xl mx-auto text-gray-800'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const response = await getPostByUri(params.uri);
  const post = response?.data?.post;
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: "blocking",
  };
}
