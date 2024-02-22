export default function Footer() {
  return (
    <footer className='w-full py-6 bg-coolGray-100 mt-20'>
      <div className='max-w-4xl mx-auto px-4 text-center text-gray-600'>
        © {new Date().getFullYear()} Headless WP Next Starter. All rights
        reserved.
      </div>
    </footer>
  );
}
