"use client";

import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { type Token } from "~/api";
import POLLING from "~/config/constants/polling";

interface IUseTokens {
	tokenList: Token[] | undefined;
	customTokenList: Token[] | undefined;
	tokenDictionary: { [key: string]: Token } | undefined;
	featuredTokenList: Token[] | undefined;
	gaugeDictionary: { [key: string]: any } | undefined;
	beraToken: Token | undefined;
	wBeraToken: Token | undefined;
	addNewToken: (token: Token | undefined) => void;
	removeToken: (token: Token) => void;
}

function tokenListToDict(list: Token[]): { [key: string]: Token } {
	return list.reduce((acc, item) => {
		// @ts-ignore
		acc[item.address] = item;
		return acc;
	}, {});
}

const useTokens = (): IUseTokens => {
	const TOKEN_KEY = "tokens";

	const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
		Token[]
	>(TOKEN_KEY, []);

	const { data } = useSWRImmutable(
		["defaultTokenList", localStorageTokenList],
		async () => {
			const tokenList = await fetch(
				process.env.NEXT_PUBLIC_TOKEN_LIST as string,
			);
			const temp = await tokenList.json();
			if (!temp.tokens)
				return { list: localStorageTokenList, featured: [], dictionary: {} };
			const defaultList = temp.tokens.map((token: any) => {
				return { ...token, default: true };
			});

			const defaultFeaturedList = temp.tokens
				.filter((token: any) => {
					const isFeatured = (tag: string) => tag === "featured";
					return token.tags.some(isFeatured);
					// return { ...token, default: true };
				})
				.map((token: any) => {
					return { ...token, default: true };
				});
			const list = [...defaultList, ...localStorageTokenList];
			// Make it unique
			const uniqueList = list.filter(
				(item, index) =>
					list.findIndex((i) => i.address === item.address) === index,
			);
			return {
				list: uniqueList,
				customList: [...localStorageTokenList],
				dictionary: tokenListToDict(list),
				gaugeDictionary: temp.gaugeMap ?? undefined,
				featured: defaultFeaturedList ?? [],
			};
		},
		{
			refreshInterval: POLLING.NORMAL,
		},
	);

	const addNewToken = (token: Token | undefined) => {
		// Indicate that this token is now accepted into the default list of tokens
		const acceptedToken = {
			...token,
			default: true,
		};

		// Check if the token already exists in tokenList
		if (
			data?.list.some(
				(t) =>
					t.address.toLowerCase() === acceptedToken?.address?.toLowerCase(),
			)
		) {
			return;
		}

		const updatedData = !token
			? [...localStorageTokenList]
			: [...localStorageTokenList, acceptedToken as Token];
		setLocalStorageTokenList(updatedData);
		// Update config data and store it in localStorage
	};

	const removeToken = (token: Token) => {
		const filteredList = localStorageTokenList.filter(
			(t) => t.address !== token.address,
		);

		const updatedData = [...filteredList];
		setLocalStorageTokenList(updatedData);
	};

	const beraToken: Token | undefined = useMemo(() => {
		if (!data?.dictionary) return undefined;
		return (data?.dictionary as { [key: string]: Token })[
			process.env.NEXT_PUBLIC_BERA_ADDRESS as string
		];
	}, [data?.dictionary]);

	const wBeraToken: Token | undefined = useMemo(() => {
		if (!data?.dictionary) return undefined;
		return (data?.dictionary as { [key: string]: Token })[
			process.env.NEXT_PUBLIC_WBERA_ADDRESS as string
		];
	}, [data?.dictionary]);

	return {
		tokenList: data?.list ?? [],
		customTokenList: data?.customList ?? [],
		tokenDictionary: data?.dictionary ?? {},
		featuredTokenList: data?.featured ?? [],
		gaugeDictionary: data?.gaugeDictionary ?? {},
		beraToken,
		wBeraToken,
		addNewToken,
		removeToken,
	};
};

export default useTokens;
