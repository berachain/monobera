/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useReducer, type Reducer } from "react";
import { type Token } from "@bera/berajs";

export interface TokenInput extends Token {
  amount: number;
}

interface IState {
  tokens: TokenInput[];
}

// generic hook for handling state on multi token input
const useMultipleTokenInput = (tokens: Token[]) => {
  const initialState: IState = {
    tokens: tokens.map((token: Token) => {
      return {
        amount: 0,
        ...token,
      };
    }),
  };

  const actionTypes = {
    UPDATE_INPUT: "UPDATE_INPUT",
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
      default:
        return state;
    }
  };

  const [addLiquidityState, dispatch] = useReducer<Reducer<IState, any>>(
    reducer,
    initialState,
  );

  const updateTokenAmount = (tokenIndex: number, input: number) => {
    dispatch({
      type: actionTypes.UPDATE_INPUT,
      payload: {
        index: tokenIndex,
        input: input,
      },
    });
  };

  return {
    tokenInputs: addLiquidityState.tokens,
    updateTokenAmount,
  };
};

export default useMultipleTokenInput;
