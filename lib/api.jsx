/**
 * Fetches all post URIs (slugs) from the WordPress REST API to generate static paths for Next.js pages.
 * This enables Static Generation for posts, creating a highly performant static site with dynamic content from WordPress.
 */
export async function getAllPostUris() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=slug`
  );
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { uri: post.slug },
  }));

  return paths;
}

/**
 * Gets the static props for a post page by fetching the post data based on the post's URI (slug).
 * This function is part of Next.js's data fetching strategy for pre-rendering pages at build time.
 * If the post cannot be found, it returns a notFound flag to render a 404 page instead.
 */
export async function getStaticProps({ params }) {
  const post = await getPostByUri(params.uri);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: post || null,
    },
    revalidate: 10, // Option for Incremental Static Regeneration (ISR)
  };
}

/**
 * Generates the static paths that Next.js will pre-render based on the post URIs fetched from WordPress.
 * This setup is essential for building static sites with dynamic content managed in WordPress.
 * The fallback mode 'blocking' ensures that any paths not generated at build time are server-side rendered on the first request.
 */
export async function getStaticPaths() {
  const paths = await getAllPostUris();

  return {
    paths,
    fallback: "blocking",
  };
}
