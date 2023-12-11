import { useCallback } from "react";

export interface Position {
	icon: string;
	assets: string;
	counter: string;
	option_type: "long" | "short";
	position_size: number;
	leverage: number;
	liquidation_price: number;
	current_price: number;
	unrealized_pnl: number;
	realized_pnl: number;
	stop_loss?: number;
	take_profit?: number;
	funding_payment: number;
	borrow_fee: number; //24 hrs
	open_interest_long: number;
	open_interest_short: number;
}

export const usePositions = () => {
	const assetsOptions = [
		"BTC",
		"ETH",
		"ADA",
		"DOT",
		"XRP",
		"LTC",
		"BCH",
		"LINK",
		"XLM",
		"USDT",
	];

	const counterOptions = ["USDT", "ETH", "BTC", "ADA", "DOT"];

	const getRandomItem = (arr: any[]) =>
		arr[Math.floor(Math.random() * arr.length)];

	const generateRandomposition = (): Position => ({
		icon: `randomString${Math.floor(Math.random() * 1000)}`,
		assets: getRandomItem(assetsOptions),
		counter: getRandomItem(counterOptions),
		option_type: Math.random() > 0.5 ? "long" : "short",
		position_size: parseFloat((Math.random() * 10).toFixed(2)),
		leverage: Math.floor(Math.random() * 100) + 1,
		liquidation_price: parseFloat((Math.random() * 50000).toFixed(2)),
		current_price: parseFloat((Math.random() * 50000).toFixed(2)),
		unrealized_pnl: parseFloat((Math.random() * 1000).toFixed(2)),
		realized_pnl: parseFloat((Math.random() * 500).toFixed(2)),
		stop_loss: parseFloat((Math.random() * 45000).toFixed(2)),
		take_profit: parseFloat((Math.random() * 55000).toFixed(2)),
		funding_payment: parseFloat((Math.random() * 0.01).toFixed(4)),
		borrow_fee: parseFloat((Math.random() * 0.02).toFixed(4)),
		open_interest_long: parseFloat((Math.random() * 0.01).toFixed(4)),
		open_interest_short: parseFloat((Math.random() * 0.01).toFixed(4)),
	});

	const generatepositionData = useCallback((): Position[] => {
		return Array.from({ length: 30 }, generateRandomposition);
	}, []);

	return { generatepositionData };
};
