import NextAuth from "next-auth/next";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      version: "2.0",
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_KEY ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      return { ...token, ...user, ...account, ...profile, ...session };
    },
    async session({ session, user, token }) {
      return { ...session, ...user, ...token };
    },
  },
});

export { handler as GET, handler as POST };
