import Link from "next/link";

export const MissingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link
        href="/editor"
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go to Editor
      </Link>
    </div>
  );
};
