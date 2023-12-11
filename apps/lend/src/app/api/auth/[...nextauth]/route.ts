import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
	providers: [
		CognitoProvider({
			clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET as string,
			issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
		}),
	],
	theme: {
		colorScheme: "dark", // "auto" | "dark" | "light"
		brandColor: "#000", // Hex color code
		buttonText: "#fff", // Hex color code
	},
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
