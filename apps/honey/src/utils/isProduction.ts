export const isProduction = () => {
	const ENV = process.env.VERCEL_ENV || process.env.NODE_ENV;
	return ENV === "production";
};
