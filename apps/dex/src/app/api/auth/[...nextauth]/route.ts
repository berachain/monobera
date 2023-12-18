import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET as string,
      issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
      userinfo: {
        url: `${process.env.NEXT_PUBLIC_COGNITO_ISSUER}/oauth2/userInfo`,
      },
    }),
  ],
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#000", // Hex color code
    buttonText: "#fff", // Hex color code
  },
  callbacks: {
    jwt({ token, profile }) {
      return {
        ...token,
        ...profile,
      };
    },
    session({ session, token }) {
      if (token) {
        session.username = token["'cognito:username'"];
        session.token = token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
