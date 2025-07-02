"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SignInSignOutButton from "./SignInSignOutButton";
import { useRouter } from "next/navigation";

const Header = () => {
  const { status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-black bg-gradient-to-r from-black to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center  self-start space-x-2">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                XPNSE DIARY
              </motion.h1>
            </Link>
          </motion.div>
          {/* Desktop Menu */}
          {status === "authenticated" && (
            <>
              <motion.div
                className="hidden md:flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {["dashboard", "expenses", "reports", "profile"].map((page) => (
                  <motion.div
                    key={page}
                    whileHover={{ zoom: 1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      href={`/${page}`}
                      className="text-gray-300 hover:text-purple-500 transition-colors"
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Link>
                  </motion.div>
                ))}
                <SignInSignOutButton status={status} />
              </motion.div>
            </>
          )}

          {/* Mobile Toggle */}
          {status === "authenticated" && (
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                className="text-gray-300 hover:text-purple-500 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden px-4 pb-4 flex flex-col space-y-4 bg-black/90"
            // initial={{ opacity: 1, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {status === "authenticated" && (
              <>
                {["dashboard", "expenses", "reports", "profile"].map((page) => (
                  <Link
                    key={page}
                    href={`/${page}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Link>
                ))}
              </>
            )}

            <button
              onClick={() => {
                if (status === "authenticated") {
                  signOut({ callbackUrl: "/" });
                } else {
                  signIn("google", { callbackUrl: "/dashboard" });
                }
              }}
              className="relative inline-flex items-center justify-center p-0.5  w-fit text-300 font-medium text-gray-900 rounded-md group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-2">
                {status === "authenticated" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                      />
                    </svg>
                    Sign Out
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.805 10.023h-9.67v3.995h5.57c-.24 1.3-.974 2.4-2.08 3.125v2.59h3.37c1.974-1.82 3.1-4.515 3.1-7.72 0-.3-.02-.6-.06-.89z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.135 22.007c2.805 0 5.16-.924 6.88-2.5l-3.37-2.59c-.94.63-2.14 1-3.51 1-2.7 0-4.99-1.82-5.81-4.275H2.78v2.684c1.71 3.39 5.27 5.68 9.355 5.68z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.325 13.642a5.953 5.953 0 010-3.276V7.682H2.78a10.007 10.007 0 000 8.646l3.545-2.686z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.135 6.727c1.526 0 2.898.52 3.975 1.54l2.975-2.974c-1.67-1.545-3.88-2.457-6.95-2.457-4.085 0-7.645 2.29-9.355 5.68l3.545 2.685c.82-2.455 3.11-4.275 5.81-4.275z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign In
                  </>
                )}
              </span>
            </button>
            {/* <SignInSignOutButton status={status} /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
