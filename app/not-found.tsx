"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => {
      router.replace("/");
    }, 2000);
    return () => clearTimeout(id);
  }, [router]);
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-black text-white px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl mt-4 text-gray-300">Page Not Found</p>
        <p className="text-md text-gray-500 mt-2">
          Sorry, we couldn’t find the page you were looking for.
        </p>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium border border-purple-700 bg-gray-900 text-white hover:shadow-purple-600/40 shadow-md transition-all duration-200"
        >
          <svg
            className="w-4 h-4 text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Go to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
