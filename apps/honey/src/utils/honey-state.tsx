export interface State {
  currentState: "approval" | "minting" | "redeeming" | "idle";
  isLoading: boolean;
  error: string | null;
}

export type Action =
  | {
      type: "SET_STATE";
      payload: "approval" | "minting" | "redeeming" | "idle";
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export const initialState: State = {
  currentState: "idle",
  isLoading: false,
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        currentState: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
