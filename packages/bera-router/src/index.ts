import { type Pool } from "./services";

export * from "./services";
export * from "./config";

export type ParsedStringPool = ParseBigIntToString<Pool>;
export type ParseBigIntToString<T> = {
	[K in keyof T]: T[K] extends bigint
		? string
		: T[K] extends object
		  ? ParseBigIntToString<T[K]>
		  : T[K];
};

export function parseBigIntToString(obj: any): any {
	if (typeof obj === "bigint") {
		return obj.toString();
	}

	if (typeof obj === "object" && obj !== null) {
		if (Array.isArray(obj)) {
			return obj.map(parseBigIntToString);
		}
		const newObj: { [key: string]: any } = {};
		for (const key in obj) {
			newObj[key] = parseBigIntToString(obj[key]);
		}
		return newObj;
	}

	return obj;
}
