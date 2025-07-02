import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "XPNSE Diary",
    short_name: "xpnse-diary",
    description:
      "XPNSE Diary is a personal finance management app that helps you track your income and expenses. You can also share your accounts and transactions with others.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/x-icon",
      },
    ],
  };
}
