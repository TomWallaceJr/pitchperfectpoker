import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={post.uri} passHref>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer w-full'>
        <div className='p-5'>
          <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
          <p className='text-gray-600'>
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
