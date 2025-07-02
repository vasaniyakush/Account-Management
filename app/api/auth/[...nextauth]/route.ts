import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log("IN CALLBACK");
      // console.log("account", account);
      // console.log("user", user);
      // console.log("token", token);
      // console.log(
      //   "process.env.NEXT_PUBLIC_BACKEND_URL",
      //   process.env.NEXT_PUBLIC_BACKEND_URL
      // );
      if (account) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/google`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${account?.id_token}`,
            },
          }
        );
        const resParsed = await res.json();
        // console.log("resParsed", resParsed);
        token = Object.assign({}, token, {
          id_token: account.id_token,
        });
        token = Object.assign({}, token, {
          myToken: resParsed.token.accessToken,
        });

        const myuser = resParsed.data;
        token = Object.assign({}, token, {
          myuser: myuser,
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          id_token: token.id_token,
        });
        session = Object.assign({}, session, {
          authToken: token.myToken,
        });
        session = Object.assign({}, session, {
          myuser: token.myuser,
        });
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
