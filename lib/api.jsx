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

export async function getStaticProps({ params }) {
  const post = await getPostByUri(params.uri);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: post || null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostUris();

  return {
    paths,
    fallback: "blocking",
  };
}
