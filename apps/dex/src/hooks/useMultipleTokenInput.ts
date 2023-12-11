import { useReducer, type Reducer } from "react";
import { type Token } from "@bera/berajs";

export interface TokenInput extends Token {
	amount: string;
	exceeding: boolean;
}

interface IState {
	tokens: TokenInput[];
}

// generic hook for handling state on multi token input
const useMultipleTokenInput = (tokens: Token[]) => {
	const initialState: IState = {
		tokens: tokens.map((token: Token) => {
			return {
				amount: "",
				exceeding: false, // Initialize exceeding status to false
				...token,
			};
		}),
	};

	const actionTypes = {
		UPDATE_INPUT: "UPDATE_INPUT",
		UPDATE_EXCEEDING: "UPDATE_EXCEEDING", // New action type for updating exceeding status
	};

	// Reducer function
	const reducer = (state: IState, action: any) => {
		switch (action.type) {
			case actionTypes.UPDATE_INPUT:
				return {
					...state,
					tokens: state.tokens.map((token: any, index: any) => {
						if (index === action.payload.index) {
							return {
								...token,
								amount: action.payload.input,
							};
						}
						return token;
					}),
				};
			case actionTypes.UPDATE_EXCEEDING: // Reducer case to update exceeding status
				return {
					...state,
					tokens: state.tokens.map((token: any, index: any) => {
						if (index === action.payload.index) {
							return {
								...token,
								exceeding: action.payload.exceeding,
							};
						}
						return token;
					}),
				};
			default:
				return state;
		}
	};

	const [addLiquidityState, dispatch] = useReducer<Reducer<IState, any>>(
		reducer,
		initialState,
	);

	const updateTokenAmount = (tokenIndex: number, input: string) => {
		dispatch({
			type: actionTypes.UPDATE_INPUT,
			payload: {
				index: tokenIndex,
				input: input,
			},
		});
	};

	const updateTokenExceeding = (tokenIndex: number, exceeding: boolean) => {
		dispatch({
			type: actionTypes.UPDATE_EXCEEDING,
			payload: {
				index: tokenIndex,
				exceeding: exceeding,
			},
		});
	};

	return {
		tokenInputs: addLiquidityState.tokens,
		updateTokenAmount,
		updateTokenExceeding, // Provide the new function
		areAllInputsEmpty: addLiquidityState.tokens.every(
			(token: TokenInput) => token.amount === "" || token.amount === "0",
		),
		areNoInputsExceeding: addLiquidityState.tokens.every(
			(token: TokenInput) => token.exceeding === false,
		),
		areAllInputsPopulated: addLiquidityState.tokens.every(
			(token: TokenInput) => token.amount !== "" && token.amount !== "0",
		),
		areSomeInputsUnpopulated: addLiquidityState.tokens.some(
			(token: TokenInput) => token.amount === "" || token.amount === "0",
		),
	};
};

export default useMultipleTokenInput;
