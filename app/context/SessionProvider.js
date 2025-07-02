"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export function SessProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
