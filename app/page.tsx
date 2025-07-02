"use client";
import SignInGoogle from "@/components/SignInGoogle";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session", session);

  useEffect(() => {
    console.log("status", status);
    if (status == "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <></>;
  } else {
    if (status === "unauthenticated") {
      return <SignInGoogle />;
    }
  }
  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
