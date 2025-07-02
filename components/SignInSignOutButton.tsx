import { signIn, signOut } from "next-auth/react";

export default function SignInSignOutButton({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  return (
    <button
      onClick={() => {
        if (status === "authenticated") {
          signOut({ callbackUrl: "/" });
        } else {
          signIn("google", { callbackUrl: "/dashboard" });
        }
      }}
      className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span className="relative flex items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {status === "authenticated" ? (
          <>
            {/* Sign Out Icon (Logout) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
              />
            </svg>
            Sign Out
          </>
        ) : (
          <>
            {/* Sign In Icon (Google "G") */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
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
  );
}
